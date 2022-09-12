const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

// The method to connect to the DB
const db = mysql.createConnection({
  host: "localhost",
  user: "ades",
  password: "11dMp59Isi74458", // or 11dMp59$Isi74458
  database: "wcs-prjkt",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

// CORS method to avoid error
app.use(
  cors({
    origin: "*",
  })
);

// Used to get the informations from the front and use it
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Method that get the new name to add, check in Db if the name is not already used,
// then if there is no one with the same name, it insert into the DB the character
app.use("/api/addNewGuy", (req, res, next) => {
  const nameToAdd = req.body;

  db.query(
    `SELECT * FROM charactersnames WHERE charactername = "${nameToAdd.name}"`,
    function (err, result) {
      const gotcha = JSON.parse(JSON.stringify(result));
      if (err) {
        throw err;
      }
      if (gotcha.length === 1) {
        res.status(204).json(`${nameToAdd.name}`);
      }
      if (gotcha.length === 0) {
        db.query(
          `INSERT INTO charactersnames (charactername) VALUES ("${nameToAdd.name}")`,
          function (err, result) {
            if (err) {
              throw err;
            }
            res.status(200).json(`${nameToAdd.name}`);
          }
        );
      }
    }
  );
});

// Used to remove a character from the DB by getting is ID and remove him
app.use("/api/delGuy", (req, res, next) => {
  const nameToDel = req.body;

  db.query(
    `SELECT * FROM charactersnames WHERE idcharactersnames = "${nameToDel.idcharactersnames}"`,
    function (err, result) {
      const gotcha = JSON.parse(JSON.stringify(result));
      if (err) {
        throw err;
      }
      if (gotcha.length === 0) {
        res.status(204).json(`${nameToDel.charactername}`);
      }
      if (gotcha.length === 1) {
        db.query(
          `DELETE FROM charactersnames WHERE idcharactersnames = "${nameToDel.idcharactersnames}"`,
          function (err, result) {
            if (err) {
              throw err;
            }
            res.status(200).json(`${nameToDel.charactername}`);
          }
        );
      }
    }
  );
});

// Method to get all the characters in the DB for displaying supplies
app.use("/api/getCharacters", (req, res, next) => {
  db.query(`SELECT * FROM charactersnames`, function (err, result) {
    res.status(200).json(result);
  });
});

// This one is set to edit a character in DB, first it take the ID of the one
// who need to be replaced, if he already exist in DB and is not already used,
// the method UPDATE the name with the new one
app.use("/api/editGuy", (req, res, next) => {
  const idToEdit = req.body.id;
  const nameEdited = req.body.nom.name;
  db.query(
    `SELECT * FROM charactersnames WHERE idcharactersnames = "${idToEdit}"`,
    function (err, result) {
      const gotcha = JSON.parse(JSON.stringify(result));
      if (idToEdit === gotcha[0].idcharactersnames) {
        db.query(
          `SELECT * FROM charactersnames WHERE charactername = "${nameEdited}"`,
          function (err, result) {
            console.log(result.length, "Result");
            if (result.length === 0) {
              db.query(
                `UPDATE charactersnames
              SET charactername = "${nameEdited}"
              WHERE idcharactersnames = ${idToEdit}`,
                function (err, result) {
                  res.status(200).json(result);
                }
              );
            } else {
              res.status(204).json(result);
            }
          }
        );
      } else {
        res.status(404).json(result);
      }
    }
  );
});

module.exports = app;
