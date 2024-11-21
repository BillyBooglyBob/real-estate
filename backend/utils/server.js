import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "../routes/auth.route.js";
import listingRouter from "../routes/listing.route.js";
import path from "path";

// creates the server with all the middlewares and routers
const createServer = () => {
  // Establish connection to the database
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected to mongoDB");
    })
    .catch((err) => {
      console.log(err);
    });

  // Gets the current directory, ensures cross platform compatibility
  const __dirname = path.resolve();

  // Initialise the express app
  const app = express();

  // Middlewares setup
  // Parse incoming JSON requests and make it available under req.body property
  app.use(express.json());
  // Parse cookies sent with requests and make them accessible under req.cookies
  app.use(cookieParser());

  // Logs all incoming requests' paths and HTTP method to the console
  app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
  });

  // Routing setup
  // Authentication routes, all handled by authRouter
  app.use("/api/auth", authRouter);
  // Listings routes, all handled by listingRouter
  app.use("/api/listings", listingRouter);

  // Serve the frontend static files
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // Serve the frontend index.html file for all other undefined routes
  // Serves as fallback so the user will not encounter 404 error
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });

  return app;
};

export default createServer;
