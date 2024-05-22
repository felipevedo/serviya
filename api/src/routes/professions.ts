import express from "express";
import { all, getDb } from "../db";

const router = express.Router();

router.get("/professions", async function (req, res) {
  const db = await getDb();
  const professions = await all(db, `SELECT * FROM Professions`);
  res.json({ data: professions });
});

export default router;
