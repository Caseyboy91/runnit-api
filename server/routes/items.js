const express = require("express");
const router = express.Router();
const fs = require("node:fs");

const getItems = (req, res) => {
  const items = getList();
  res.json(items);
};

// /bar
router.route("/").get(getItems);

const getList = () => {
  const itemsFromFile = fs.readFileSync("./data/items.json");
  return JSON.parse(itemsFromFile);
};

module.exports = router;
