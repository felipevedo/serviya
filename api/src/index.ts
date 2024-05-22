// @ts-nocheck
import express from "express";
import authRouter from "./routes/auth";
import professionsRouter from "./routes/professions";
import areasRouter from "./routes/areas";
import usersRouter from "./routes/users";
import passport from "passport";
import session from "express-session";
import connectSqlite from "connect-sqlite3";
import { setupDb } from "./db/migration";
import cors from "cors";

const app = express();
const port = 3000;

app.use("/public", express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const SQLiteStore = connectSqlite(session);
app.use(
  session({
    secret: "servi Ya app",
    name: "session_serviya",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "sessions.db", dir: "./db" }),
    cookie: {
      sameSite: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: true,
    },
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
app.use("/", professionsRouter);
app.use("/", areasRouter);
app.use("/", usersRouter);

app.get("/", async (req, res) => {
  console.log("[req.session] ", req.session);
  console.log("[req.user] ", req.user);
  console.log("[req.headers] ", req.headers);
  console.log("[req.query] ", req.query);
  res.send("ServiYa Lista");
});
