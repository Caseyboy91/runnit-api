const express = require("express");
const router = express.Router();
const fs = require("node:fs");

const getBarItems = (req, res) => {
  const barItems = getBarList();
  res.json(barItems);
};

// /bar
router.route("/").get(getBarItems);

const getBarList = () => {
  const barItemsFromFile = fs.readFileSync("./data/bar.json");
  return JSON.parse(barItemsFromFile);
};

module.exports = router;
