import mongoose from "mongoose"
import Listing from "../models/listing.model.js"
import User from "../models/user.model.js"
import { getOrSetCache } from "../utils/redis.js"

// Create a listing
export const createListing = async (req, res) => {
  try {
    // use the current signed in user's id as the seller
    const inputs = { ...req.body, seller: req.user.id }
    const newListing = await Listing.createNewListing(inputs)

    res.status(200).json(newListing)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get listings based on search parameters
export const getListings = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || '';
    const type = req.query.type || 'Sell';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';
    const limit = parseInt(req.query.limit) || 4;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const cacheKey = `listings:${searchTerm}-${type}-${sort}-${order}-${limit}-${startIndex}`;

    const query = async () => {
      const query = {
        address: { $regex: searchTerm, $options: 'i' },
        type
      };

      const [listings, totalListings] = await Promise.all([
        Listing.find(query)
          .sort({ [sort]: order })
          .limit(limit)
          .skip(startIndex),
        Listing.countDocuments(query)
      ]);

      return {
        listings,
        totalListings,
        totalPages: Math.ceil(totalListings / limit)
      };
    }

    let data;
    try {
      data = await getOrSetCache(cacheKey, query);
    } catch (cacheError) {
      console.error('Cache error, falling back to direct database query:', cacheError);
      // Fallback to direct database query
      data = query()
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Listing Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single listing by its id
export const getListing = async (req, res) => {
  try {
    const listingID = req.params.id;

    const cacheKey = `listing:${listingID}`;

    const query = async () => {
      // Check if the id is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(listingID)) {
        return res.status(404).json({ error: 'Invalid ID' });
      }

      const listing = await Listing.findById(listingID).lean(); // Convert to plain object

      if (!listing) {
        return res.status(404).json({ error: 'Listing does not exist' });
      }

      // Get seller details
      const seller = await User.findById(listing.seller).lean(); // Convert to plain object

      // Format ObjectId and Date fields
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

    let data;
    try {
      data = await getOrSetCache(cacheKey, query);
    } catch (cacheError) {
      console.error('Cache error, falling back to direct database query:', cacheError);
      // Fallback to direct database query
      data = query()
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// get all listings of a user by email
export const getUserListings = async (req, res) => {
  try {
    const userEmail = req.params.email

    const cacheKey = `userListings:${userEmail}`;

    const query = async () => {
      // get the id of the user
      const userId = await User.findOne({ email: userEmail }).select('id')

      // get the listings of the user
      const userListings = await Listing.find({ seller: userId._id })

      return {
        email: userEmail,
        listings: userListings
      }
    }

    let data;
    try {
      data = await getOrSetCache(cacheKey, query)
    } catch (cacheError) {
      console.error('Cache error, falling back to direct database query:', cacheError);
      // Fallback to direct database query
      data = query()
    }

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
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

    if (!updatedListing) {
      return res.status(404).json({ error: 'Listing not found' })
    }

    res.status(200).json(updatedListing)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}