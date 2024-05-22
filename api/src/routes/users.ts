// @ts-nocheck
import express from "express";
import { all, getDb, close, run, get } from "../db";
import { ensureLoggedIn } from "../middlewares/ensureLoggedIn";

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

router.put("/users/:id", async function (req, res) {
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
        fullUser.profileImg,
        fullUser.profileDescription,
        fullUser.phone,
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
            profileImg = ?,
            profileDescription = ?,
            phone = ?,
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

export default router;
