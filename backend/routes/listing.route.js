import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { checkToken } from "../utils/checkToken.js";

const router = express.Router()

router.post('/', checkToken, createListing)

export default router