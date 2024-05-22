// @ts-nocheck
import express from "express";
import authRouter from "./routes/auth";
import { all, getDb } from "./db";
import passport from "passport";
import session, { Store } from "express-session";
import connectSqlite from "connect-sqlite3";
import { setupDb } from "./db/migration";
import bodyParser from "body-parser";
import { ensureLoggedIn } from "./middlewares/ensureLoggedIn";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const SQLiteStore = connectSqlite(session);
app.use(
  session({
    secret: "servi Ya app",
    resave: false,
    saveUninitialized: false,
    // store: new SQLiteStore() as Store
    store: new SQLiteStore({ db: "sessions.db", dir: "./db" }), // 'serviya.db'
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.listen(port, async () => {
  try {
    await setupDb();
  } catch (e) {
    console.log("error setting up DB");
  }

  console.log(`ServiYa listening on port ${port}`);
});

app.use("/", authRouter);

app.get("/", async (req, res) => {
  console.log("[req.session] ", req.session);
  console.log("[req.user] ", req.user);
  console.log("[req.headers] ", req.headers);
  console.log("[req.query] ", req.query);
  // const db = await getDb()
  // const sql = `SELECT * FROM users;`
  // const users = await all<Record<any, any>>(db, sql)
  // db.close()

  // console.clear()
  // console.log(users)

  res.send("ServiYa Lista");
});

app.get("/private", ensureLoggedIn, (req, res) => {
  console.log("[req.session] ", req.session);
  res.send("response from private");
});

// 1 - add db
// create models and tables
// 2 - add passport and passport strategy for basic auth
// 3 - connect FE to the API
// 4 - make a test auth call
// 5 - create registration form
