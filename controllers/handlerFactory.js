const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const mysql = require("mysql");
const fs = require("fs");

let myKeys = [];

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fileimport",
});

const readKeys = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("not find that file");
      resolve(data);
    });
  });
};

exports.insertData = async (req, res, next) => {
  let path = `C:/Users/David/OneDrive/Desktop/file import/samples/files/${req.body.numberFolder}/${req.body.fileName}.json`;
  const data = await readKeys(path);
  //let keys = Object.create(data)
  jsonParsed = JSON.parse(data);
  let arr1 = Object.keys(jsonParsed[req.body.numberObjinFile]);
  let commonKeys = [];
  // Array to contain common elements
  for (let i = 0; i < arr1.length; ++i) {
    for (let j = 0; j < myKeys.length; ++j) {
      if (arr1[i] == myKeys[j]) {
        // If element is in both the arrays
        commonKeys.push(arr1[i]); // Push to common array
      }
    }
  }
  let myValues = [];
  //find myvalues
  for (let i = 0; i < commonKeys.length; ++i) {
    myValues.push(jsonParsed[req.body.numberObjinFile][commonKeys[i]]);
  }

  //regex to have each values in double quotes
  let values1 = myValues.toString().replace(/(\d+,)/g, '$1 "');

  let query1 = `INSERT INTO ${req.body.table} (${commonKeys.join(
    ", "
  )}) VALUES ("${values1.replace(/[,]+/g, '"$&')}")`;

  db.query(query1, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      status: "success",
      data: {
        data: query1,
      },
    });
  });
};

exports.addCorrectData = async (req, res, next) => {
  let query = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${req.body.table}'`;
  db.query(query, (err, rows) => {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].COLUMN_NAME !== "limit") {
        myKeys.push(rows[i].COLUMN_NAME);
      }
    }
    res.status(200).json({
      status: "success",
      data: query,
    });
  });
};
