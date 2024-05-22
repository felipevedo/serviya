import { Handler } from "express";

export const ensureLoggedIn: Handler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json("Not Authorized");
  }
};
