var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Result: " + result);
  });
});

module.exports = router;
