import express from "express";
import { all, getDb } from "../db";

const router = express.Router();

router.get("/areas", async function (req, res) {
  const db = await getDb();
  const areas = await all(db, `SELECT * FROM Areas`);
  res.json({ data: areas });
});

export default router;
