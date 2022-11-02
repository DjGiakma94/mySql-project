const app = require("./app");

const mysql = require("mysql");

const port = 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fileimport",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected db!");
});

//manage other errors
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection. Shutting down...");
  console.log(err.name, err.message);
  //before closing server and after the app
  server.close(() => {
    process.exit(1); //0 is for success and 1 is for errors
  });
});
