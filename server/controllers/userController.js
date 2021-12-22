import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.js";
import {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
} from "../utils/tokenUtils.js";

dotenv.config();

export const userSignup = async (req, res) => {
  // check for existing email
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res
      .status(401)
      .json({ name: "EmailError", message: "The email already exist" });
  }

  User.register(
    new User({ email: req.body.email }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        const token = getToken({ _id: user._id });
        const refreshToken = getRefreshToken({ _id: user._id });
        user.refreshToken.push({ refreshToken });
        user.save((err, user) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res
              .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
              .send({ success: true, token });
          }
        });
      }
    }
  );
};

export const userLogin = (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  const refreshToken = getRefreshToken({ _id: req.user._id });
  User.findById(req.user._id).then(
    (user) => {
      user.refreshToken.push({ refreshToken });
      user.save((err, user) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res
            .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            .json({ success: true, token });
        }
      });
    },
    (err) => next(err)
  );
};

export const userRefreshToken = (req, res, next) => {
  try {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;

    if (refreshToken) {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const userId = payload._id;
      User.findOne({ _id: userId }).then(
        (user) => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );

            if (tokenIndex === -1) {
              res.status(401).send("Unauthorized");
            } else {
              const token = getToken({ _id: userId });
              // if the refresh token exists, then create new one and replace it
              const newRefreshToken = getRefreshToken({ _id: userId });
              user.refreshToken[tokenIndex] = {
                refreshToken: newRefreshToken,
              };
              user.save((err, user) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res
                    .cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                    .json({ success: true, token });
                }
              });
            }
          }
        },
        (err) => next(err)
      );
    }
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

export const userLogout = (req, res) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  User.findById(req.user._id).then(
    (user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );

      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }

      user.save((err, user) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res
            .clearCookie("refreshToken", COOKIE_OPTIONS)
            .send({ success: true });
        }
      });
    },
    (err) => next(err)
  );
};

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ success: false, message: "You are not authorized to view this" });
  }
};