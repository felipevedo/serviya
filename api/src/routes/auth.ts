// @ts-nocheck
import express from "express";
import passport from "passport";
import crypto from "crypto";
import { getDb, get } from "../db";
import { getRandomBytes } from "../utils";
import { User } from "../models/User";
import LocalStrategy from "passport-local";

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    console.log("start auth", { username, password });
    return cb(null, { id: 123, username: "foo" });

    // const db = await getDb()

    // // await get(db, 'SELECT * FROM Users WHERE username = ?')
    // db.get('SELECT * FROM Users WHERE username = ?', [ username ], async function(err, row) {
    //   console.log('here')
    //   if (err) { return cb(err); }
    //   if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    //   console.log('row', row)
    //   // return cb(null, row)

    //   // const { salt, hashedPassword } = User.decodePassword(row.password)
    //   // const passwordBuffer = Buffer.from(hashedPassword, 'utf-8');
    //   // const hashedRequestPassword = await User.hashPassword(password, salt)

    //   // if (!crypto.timingSafeEqual(passwordBuffer, hashedRequestPassword)) {
    //   //   return cb(null, false, { message: 'Incorrect username or password.' });
    //   // }

    //   return cb(null, row);
    // });
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const router = express.Router();
router.post("/register", (req, res) => {
  console.log("register was hit", req.body);
  res.json({ message: "any body" }); // ### make sure you're using json all over
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("[req.session] ", req.session);
  console.log("[req.user] ", req.user);
  console.log("[req.headers] ", req.headers);
  res.send("/login respondiendo");
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/signup", function (req, res, next) {
  // var salt = crypto.randomBytes(16);
  // crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
  //   if (err) { return next(err); }
  //   db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
  //     req.body.username,
  //     hashedPassword,
  //     salt
  //   ], function(err) {
  //     if (err) { return next(err); }
  //     var user = {
  //       id: this.lastID,
  //       username: req.body.username
  //     };
  //     req.login(user, function(err) {
  //       if (err) { return next(err); }
  //       res.redirect('/');
  //     });
  //   });
  // });
});

export default router;
