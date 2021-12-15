import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/dbconnect.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

if (process.env.NODE_ENV !== "production") {
  // load environment variable from .env file in non prod environments
  dotenv.config();
}

// MongoDB connection
const DB_CONNECTION =
  "mongodb+srv://renniel_betasolo:renniel_betasolo@prod-cluster.rkvtr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
connectDB(DB_CONNECTION);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// Add the client url to the cors policy
const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use(router);

// start the server in port 8081
const PORT = process.env.PORT || 8081;
app.listen(PORT, () =>
  console.log(`Server listens on http://localhost:${PORT}`)
);
