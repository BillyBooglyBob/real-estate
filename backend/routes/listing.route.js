import express from "express";
import { createListing, getListing } from "../controllers/listing.controller.js";
import { checkToken } from "../utils/checkToken.js";

const router = express.Router()

router.post('/', checkToken, createListing)

// Doesn't need to check token as everyone should be able to view listings
router.get('/:id', getListing)

export default router