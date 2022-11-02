var express = require("express");
var router = express.Router();
var loopController = require("../controllers/loopController");
// another routes also appear here
// this script to fetch data from MySQL databse table
router.post("/agenti", loopController.findColumns);
router.post("/agenti/go", loopController.findAgents);

module.exports = router;
