import mongoose from "mongoose"
import Listing from "../models/listing.model.js"
import User from "../models/user.model.js"
import { getOrSetCache, client, deleteCache } from "../utils/redis.js"

// Create a listing
export const createListing = async (req, res) => {
  try {
    // use the current signed in user's id as the seller
    const inputs = { ...req.body, seller: req.user.id }

    const newListing = await Listing.createNewListing(inputs)

    // Invalidate cache
    // For both the general listings and the current user's listings
    const user = await User.findById(req.user.id)
    deleteCache(['listings:*', `userListings:${user.email}`])

    // Check if user listings are deleted
    // Retrieve the user email manually
    console.log("Current user is: ", user.email)
    console.log("Listings cache deleted: ", await client.get('listings:*'))
    console.log("User listings cache deleted: ", await client.get(`userListings:${user.email}`))

    res.status(200).json(newListing)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get listings based on search parameters
export const getListings = async (req, res) => {
  const searchTerm = req.query.searchTerm || '';
  const type = req.query.type || 'Sell';
  const sort = req.query.sort || 'createdAt';
  const order = req.query.order || 'desc';
  const limit = parseInt(req.query.limit) || 4;
  const startIndex = parseInt(req.query.startIndex) || 0;

  const cacheKey = `listings:${searchTerm}-${type}-${sort}-${order}-${limit}-${startIndex}`;

  try {
    const query = async () => {
      const query = {
        address: { $regex: searchTerm, $options: 'i' },
        type
      };

      const [listings, totalListings] = await Promise.all([
        Listing.find(query)
          .sort({ [sort]: order })
          .limit(limit)
          .skip(startIndex)
          .lean(), // Convert to plain object
        Listing.countDocuments(query)
      ]);

      return {
        listings,
        totalListings,
        totalPages: Math.ceil(totalListings / limit)
      };
    }

    const data = await getOrSetCache(cacheKey, query);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Listing Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single listing by its id
export const getListing = async (req, res) => {
  const listingID = req.params.id;
  const cacheKey = `listing:${listingID}`;

  try {
    // Define query function
    const query = async () => {
      // Check if the id is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(listingID)) {
        throw new Error('Invalid ID');
      }

      // Get listing details
      const listing = await Listing.findById(listingID).lean(); // Convert to plain object
      if (!listing) {
        throw new Error('Listing does not exist');
      }

      // Get seller details
      const seller = await User.findById(listing.seller).lean(); // Convert to plain object

      return {
        ...listing,
        _id: listing._id.toString(), // Convert ObjectId to string
        createdAt: listing.createdAt.toISOString(), // Convert Date to string
        updatedAt: listing.updatedAt.toISOString(),
        seller: seller
          ? {
            ...seller,
            _id: seller._id.toString(),
            createdAt: seller.createdAt.toISOString(),
            updatedAt: seller.updatedAt.toISOString(),
          }
          : null,
      };
    }

    const data = await getOrSetCache(cacheKey, query);
    res.status(200).json(data);
  } catch (error) {
    const status = error.message.includes('Invalid ID') ||
      error.message.includes('does not exist') ? 404 : 500;
    return res.status(status).json({ error: error.message });
  }
};


// get all listings of a user by email
export const getUserListings = async (req, res) => {
  const userEmail = req.params.email
  const cacheKey = `userListings:${userEmail}`;

  try {
    const query = async () => {
      // get the id of the user
      const userId = await User.findOne({ email: userEmail }).select('id')
      if (!userId) {
        throw new Error('User not found')
      }

      // get the listings of the user
      const userListings = await Listing.find({ seller: userId._id }).lean()

      return {
        email: userEmail,
        listings: userListings
      }
    }

    const data = await getOrSetCache(cacheKey, query)
    res.status(200).json(data)
  } catch (error) {
    const status = error.message === "User not found" ? 404 : 500
    res.status(status).json({ error: error.message })
  }
}

// deletes the listing with the id provided
export const deleteListing = async (req, res) => {
  try {
    const id = req.params.id

    // verify the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Invalid ID' })
    }

    const listingDeleted = await Listing.findByIdAndDelete(id)

    // Invalidate cache
    const user = await User.findById(req.user.id).lean()
    deleteCache([`listing:${id}`, `userListings:${user.email}`, 'listings:*'])

    // Check if user listings are deleted
    // Retrieve the user email manually
    console.log("Current user is: ", user.email)
    console.log("Listings cache deleted: ", await client.get('listings:*'))
    console.log("User listings cache deleted: ", await client.get(`userListings:${user.email}`))
    console.log("Listing cache deleted: ", await client.get(`listing:${id}`))

    res.status(200).json({ listing: listingDeleted })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// update the listing
export const updateListing = async (req, res) => {
  try {
    const id = req.params.id

    // use the current signed in user's id as the seller
    const inputs = { ...req.body, seller: req.user.id }

    const updatedListing = await Listing.findOneAndUpdate(
      { _id: id },
      inputs,
      { new: true, runValidators: true }
    )

    console.log("Listing ID: ", id)

    if (!updatedListing) {
      return res.status(404).json({ error: 'Listing not found' })
    }

    // Invalidate cache
    const user = await User.findById(req.user.id)
    deleteCache([`listing:${id}`, `userListings:${user.email}`, 'listings:*'])

    // Check if user listings are deleted
    // Retrieve the user email manually
    console.log("Current user is: ", user.email)
    console.log("Listings cache deleted: ", await client.get('listings:*'))
    console.log("User listings cache deleted: ", await client.get(`userListings:${user.email}`))
    console.log("Listing cache deleted: ", await client.get(`listing:${id}`))

    res.status(200).json(updatedListing)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}