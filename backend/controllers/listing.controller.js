import mongoose from "mongoose"
import Listing from "../models/listing.model.js"
import User from "../models/user.model.js"

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

// Get a single listing by its id
export const getListing = async (req, res) => {
    try {
        const listingID = req.params.id

        // check if the id is a mongoDB id
        if (!mongoose.Types.ObjectId.isValid(listingID)) {
            return res.status(404).json({ error: 'Invalid ID' })
        }

        const listing = await Listing.findById(listingID)

        if (!listing) {
            return res.status(404).json({ error: 'Listing does not exist' })
        }

        res.status(200).json(listing)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// get all listings of a user by email
export const getUserListings = async (req, res) => {
    try {
        const userEmail = req.params.email

        // get the id of the user
        const userId = await User.findOne({ email: userEmail }).select('id')

        // get the listings of the user
        const userListings = await Listing.find({ seller: userId._id })

        res.status(500).json({ email: userEmail, listings: userListings })
    } catch (error) {
        res.status(200).json({ error: error.message })
    }

}