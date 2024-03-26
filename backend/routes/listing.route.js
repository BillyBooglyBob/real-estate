import express from "express";
import { createListing, deleteListing, getListing, getListings, getUserListings } from "../controllers/listing.controller.js";
import { checkToken } from "../utils/checkToken.js";

const router = express.Router()

// create listing
router.post('/', checkToken, createListing)

// get listings (can specify filters)
router.get('/search', getListings)

// data for one listing
// no need to check token as everyone should be able to view listings
router.get('/:id', getListing)

// all listings of a user
// no need to check token as profile can only be accessed when the user is logged in
router.get('/view/:email', getUserListings)

// delete the selected listing
router.post('/:id', checkToken, deleteListing)


export default router