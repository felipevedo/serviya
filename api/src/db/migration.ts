import { exec, getDb, run } from ".";
import { User } from "../models/User";

export const setupDb = async () => {
  const db = await getDb();
  await exec(
    db,
    `
    DROP TABLE IF EXISTS Ranks;
    DROP TABLE IF EXISTS Areas;
    DROP TABLE IF EXISTS Professions;
    DROP TABLE IF EXISTS Users;

    CREATE TABLE Ranks (
      ID_Rank INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE Areas (
      ID_Area INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE Professions (
      ID_Profession INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE Users (
      ID_User INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT,
      email TEXT NOT NULL,
      password  TEXT NOT NULL,
      profileImg TEXT,
      profileDescription TEXT,
      phone TEXT,
      yearsOfExperience INTEGER,
      pricePerHour INTEGER,
      ID_Profession INTEGER,
      ID_Area INTEGER,
      ID_Rank INTEGER,
      FOREIGN KEY (ID_Profession) REFERENCES Professions (ID_Profession),
      FOREIGN KEY (ID_Area) REFERENCES Areas (ID_Area),
      FOREIGN KEY (ID_Rank) REFERENCES Ranks (ID_Rank) 
    );

    INSERT INTO Ranks (name) VALUES ('Necesita mejora');
    INSERT INTO Ranks (name) VALUES ('Cumple expectativas');
    INSERT INTO Ranks (name) VALUES ('Bueno');
    INSERT INTO Ranks (name) VALUES ('Excelente trabajador');
    INSERT INTO Ranks (name) VALUES ('Calidad superior');

    INSERT INTO Areas (name) VALUES ('Medellin');
    INSERT INTO Areas (name) VALUES ('Bello');
    INSERT INTO Areas (name) VALUES ('Itagui');
    INSERT INTO Areas (name) VALUES ('Sabaneta');
    INSERT INTO Areas (name) VALUES ('Envigado');
    INSERT INTO Areas (name) VALUES ('La estrella');
    INSERT INTO Areas (name) VALUES ('Rionegro');
    INSERT INTO Areas (name) VALUES ('Barbosa');
    INSERT INTO Areas (name) VALUES ('Caldas');

    INSERT INTO Professions (name) VALUES ('Carpintero');
    INSERT INTO Professions (name) VALUES ('Arquitecto');
    INSERT INTO Professions (name) VALUES ('Maestro de obra');
    INSERT INTO Professions (name) VALUES ('Albañil');
    INSERT INTO Professions (name) VALUES ('Cristalero');
    INSERT INTO Professions (name) VALUES ('Obra blanca');
    INSERT INTO Professions (name) VALUES ('Techador');
  `
  );

  const encodedPassword = await User.encodePassword("123456");
  await run(
    db,
    "INSERT INTO Users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
    ["Super User", "", "test1@test.com", encodedPassword]
  );
};
