import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";

import connectDB from "./utils/dbconnect.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

if (process.env.NODE_ENV !== "production") {
  // load environment variable from .env file in non prod environments
  dotenv.config();
}

// MongoDB connection
const DB_CONNECTION = process.env.MONGO_DB_CONNECTION_STRING;
connectDB(DB_CONNECTION);

import "./strategies/jwtStrategy.js";
import "./strategies/localStrategy.js";
import "./utils/tokenUtils.js";

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

// Passportjs
app.use(passport.initialize());

// Routes
app.use("/users", userRouter);
app.get("/", (req, res) => {
  res.send({ status: "success" });
});

// start the server in port 8081
const PORT = process.env.PORT || 8081;
app.listen(PORT, () =>
  console.log(`Server listens on http://localhost:${PORT}`)
);
