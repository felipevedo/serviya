import sqlite3, { Database, RunResult, Statement } from "sqlite3";

export function getDb(): Promise<Database> {
  return new Promise((resolve, reject) => {
    sqlite3.verbose();
    const db = new sqlite3.Database("./db/serviya.db", (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(db);
    });
  });
}

export function run(
  db: Database,
  sql: string,
  params: any = []
): Promise<RunResult> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (this: RunResult, err: Error) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

export function exec(db: Database, sql: string) {
  return new Promise((resolve, reject) => {
    db.exec(sql, function (this: Statement, err: Error | null) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

export function all<T = unknown>(
  db: Database,
  sql: string,
  params: any = []
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows: T[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function get<T = unknown>(
  db: Database,
  sql: string,
  params: any = []
): Promise<T> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row: T) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function close(db: Database) {
  return new Promise<void>((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
