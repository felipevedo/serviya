// @ts-nocheck
import express from "express";
import passport from "passport";
import { getDb, run } from "../db";
import { User } from "../models/User";
import LocalStrategy from "passport-local";

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    const db = await getDb();

    db.get(
      "SELECT * FROM Users WHERE email = ?",
      [username],
      async function (err, row) {
        console.log("doing auth", { err, row });
        if (err) {
          return cb(err);
        }
        if (!row) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }

        const { salt, hashedPassword } = User.decodePassword(row.password);
        const hashedRequestPassword = await User.hashPassword(password, salt);
        const passwordToValidate = hashedRequestPassword.toString("utf-8");

        if (passwordToValidate === hashedPassword) {
          console.log("passwords are equal");
          return cb(null, row);
        }
      }
    );
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.ID_User, username: user.email });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.clear();
  console.log("[req.session] ", req.session);
  console.log("[req.user] ", req.user);
  res.json({ message: "user is logged in", id: req.session.passport.user.id });
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/signup", async function (req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  const sanitizedLastName = lastName ?? "";
  const encodedPassword = await User.encodePassword(password);

  const db = await getDb();
  const { lastID } = await run(
    db,
    "INSERT INTO Users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
    [firstName, sanitizedLastName, email, encodedPassword]
  );
  const newUser = {
    id: lastID,
    firstName,
    lastName: sanitizedLastName,
    email,
  };

  req.login(newUser, function (err) {
    if (err) {
      return next(err);
    }
    res.json({
      message: "Registered and logged user in",
      id: newUser.id,
    });
  });
});

export default router;
