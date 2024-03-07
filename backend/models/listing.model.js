import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Sell', 'Rent']
    },
    specifications: {
        rooms: {
            type: Number,
            required: true
        },
        bathrooms: {
            type: Number,
            required: true
        },
        parkings: {
            type: Number,
            required: true
        },
    },
    imageUrls: {
        type: Array,
        required: true
    },
    seller: {
        type: String,
        required: true
    }
}, { timestamps: true })

listingSchema.statics.createNewListing = async function ({ address, description,
    price, type, specifications, imageUrls, seller }) {

    const { rooms, bathrooms, parkings } = specifications

    if (price < 0 || rooms < 0 || bathrooms < 0 || parkings < 0) {
        throw Error('Values cannot be negative')
    }

    if (type !== 'Sell' && type !== 'Rent') {
        throw Error(`Invalid listing type
        Can only list for
        - Sell
        - Rent
        `)
    }

    if (imageUrls.length === 0) {
        throw Error('Must upload at least one image')
    }

    if (imageUrls.length > 7) {
        throw Error('Maximum 6 images per listing')
    }

    const duplicateAddress = await this.findOne({ address })
    if (duplicateAddress) {
        throw Error("Address must be unique")
    }

    const newListing = this.create({
        address,
        description,
        price,
        type,
        specifications,
        imageUrls,
        seller
    })

    return newListing
}

const Listing = mongoose.model('Listing', listingSchema)

export default Listing