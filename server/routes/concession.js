const express = require("express");
const router = express.Router();
const fs = require("node:fs");

const getConcessionItems = (req, res) => {
  const concessionItems = getConcessionList();
  res.json(concessionItems);
};

// /concession
router.route("/").get(getConcessionItems);

const getConcessionList = () => {
  const concessionItemsFromFile = fs.readFileSync("./data/concession.json");
  return JSON.parse(concessionItemsFromFile);
};

module.exports = router;
