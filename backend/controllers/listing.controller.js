import mongoose from "mongoose"
import Listing from "../models/listing.model.js"

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
        res.status(500).json({error: error.message})
    }
}