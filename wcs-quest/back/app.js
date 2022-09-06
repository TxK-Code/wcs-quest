const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

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

app.use(
  cors({
    origin: "*",
  })
);

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/api/addCharacters", (req, res, next) => {
  const nameToAdd = req.body;

  console.log(nameToAdd, " nameToAdd");

  db.query(
    `INSERT INTO charactersnames (charactername) VALUES ("${nameToAdd.name}")`,
    function (err, result) {
      db.query(
        `DELETE from charactersnames WHERE charactername = "undefined"
      `,
        function (err, result) {
          db.query(
            `SELECT * FROM charactersnames WHERE charactername = "${nameToAdd.name}"`,
            function (err, result) {
              console.log(JSON.stringify(result), "RESULTATTTTTT");
            }
          );
          res.status(200).json(`${nameToAdd.name}`);
        }
      );
    }
  );
});

app.use("/api/addNewGuy", (req, res, next) => {
  const nameToAdd = req.body;

  console.log(nameToAdd.name, " nameToAdd");

  db.query(
    `SELECT * FROM charactersnames WHERE charactername = "${nameToAdd.name}"`,
    function (err, result) {
      const gotcha = JSON.parse(JSON.stringify(result));
      console.log(gotcha.length, "result");
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

app.use("/api/getCharacters", (req, res, next) => {
  db.query(`SELECT * FROM charactersnames`, function (err, result) {
    res.status(200).json(result);
  });
});

module.exports = app;
