import Listing from "../models/listing.model.js"

export const createListing = async (req, res) => {
    try {
        const inputs = {...req.body, seller: req.user.id}
        const newListing = await Listing.createNewListing(inputs)

        res.status(200).json(newListing)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}