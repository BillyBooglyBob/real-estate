import express from "express";
import { createListing, deleteListing, getAllListings, getListing, getUserListings } from "../controllers/listing.controller.js";
import { checkToken } from "../utils/checkToken.js";

const router = express.Router()

// get all listings
router.get('/', getAllListings)

// create listing
router.post('/', checkToken, createListing)

// data for one listing
// no need to check token as everyone should be able to view listings
router.get('/:id', getListing)

// all listings of a user
// no need to check token as profile can only be accessed when the user is logged in
router.get('/view/:email', getUserListings)

// delete the selected listing
router.post('/:id', deleteListing)



export default router