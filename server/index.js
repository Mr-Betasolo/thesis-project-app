import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import passport from "passport";

import connectDB from "./config/dbconnect.js";
import router from "./routes/index.js";

// implementing passport local-strategy
import "./config/passport.js";

const app = express();

// Gives access to variable set in the .env file
dotenv.config();

// MongoDB connection
const DB_CONNECTION =
  "mongodb+srv://renniel_betasolo:renniel_betasolo@prod-cluster.rkvtr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
connectDB(DB_CONNECTION);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Sessions
const sessionStore = MongoStore.create({
  mongoUrl: DB_CONNECTION,
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day
    },
  })
);

//  PassportJs configuration
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(router);

app.listen(PORT, () =>
  console.log(`Server listens on http://localhost:${PORT}`)
);
