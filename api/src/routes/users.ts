// @ts-nocheck
import express from "express";
import { all, getDb, close, run, get } from "../db";
import { ensureLoggedIn } from "../middlewares/ensureLoggedIn";
import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = (
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9)
    ).substring(0, 4);
    const sanitizedName = file.originalname.replaceAll(" ", "");
    const ext = file.mimetype.split("/")[1];

    cb(null, `${sanitizedName}-${uniqueSuffix}.${ext}`);
  },
});
const upload = multer({ dest: "uploads/", storage });
const router = express.Router();

router.get("/users", async function (req, res) {
  const db = await getDb();
  const users = await all(db, `SELECT * FROM Users`);
  res.json({ data: users });
});

router.get("/users/:id", ensureLoggedIn, async function (req, res) {
  const { id } = req.params;
  const userId = parseInt(id);
  if (!isNaN(userId)) {
    const db = await getDb();
    const user = await get(db, `SELECT * FROM Users WHERE ID_User = ?`, [
      userId,
    ]);

    if (user) {
      return res.json({ data: user });
    }
  }

  res.json({ message: "user not found" });
});

router.put("/users/:id", ensureLoggedIn, async function (req, res) {
  const { id } = req.params;
  const userId = parseInt(id);

  if (!isNaN(userId)) {
    console.clear();
    console.log("PUT users req.body", req.body);

    // get the user
    const db = await getDb();
    const user = await get(db, `SELECT * FROM Users WHERE ID_User = ?`, [
      userId,
    ]);

    if (user) {
      console.log("will update this user", user);

      // strip out all empty
      const updateObj = Object.entries(req.body).filter(
        ([key, value]) => !!value
      );
      const fullUser = Object.assign(user, Object.fromEntries(updateObj));
      const sqlParams = [
        fullUser.firstName,
        fullUser.lastName,
        fullUser.email,
        fullUser.profileDescription,
        fullUser.phone,
        fullUser.yearsOfExperience,
        fullUser.pricePerHour,
        parseInt(fullUser.ID_Profession),
        parseInt(fullUser.ID_Area),
        parseInt(fullUser.ID_Rank),
        userId,
      ];

      console.log("to this fullUser", fullUser);

      const sql = `
      UPDATE Users
        SET firstName = ?,
            lastName = ?,
            email = ?,
            profileDescription = ?,
            phone = ?,
            yearsOfExperience = ?,
            pricePerHour = ?,
            ID_Profession = ?,
            ID_Area = ?,
            ID_Rank = ?
      WHERE ID_User = ?;
    `;

      await run(db, sql, sqlParams);
      await close(db);

      res.json({ message: "users PUT", user: fullUser });
    } else {
      res.json({ message: "user not found" });
    }
  }
});

router.post(
  "/users/:id/profileImg",
  ensureLoggedIn,
  upload.single("file"),
  async (req, res) => {
    const { id } = req.params;
    const userId = parseInt(id);
    if (!isNaN(userId)) {
      const db = await getDb();
      const user = await get(db, `SELECT * FROM Users WHERE ID_User = ?`, [
        userId,
      ]);

      if (user) {
        const basePath = path.basename(req.file.path);
        const publicPath = `/public/${basePath}`;
        const sqlParams = [publicPath, userId];
        const sql = `
        UPDATE Users
          SET profileImg = ?
        WHERE ID_User = ?;
      `;

        await run(db, sql, sqlParams);
        await close(db);

        res.json({ message: "image uploaded", data: publicPath });
      }
    }
  }
);

export default router;
