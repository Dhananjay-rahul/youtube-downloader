// src/index.ts
import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import youtubeRoute from "./routes/youtube.route";
import { json } from "body-parser";

/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app: Express = express();
app.use(json()); // registering this middleware for accepting json requests
const port = process.env.PORT || 3000;

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Working" });
});

app.use("/youtube-lb", youtubeRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
