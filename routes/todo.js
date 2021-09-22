const express = require("express");
const router = express.Router();
const fetchDatatypes = require("../lib/helper/fetchDatatypes");
const { newEntry } = require("../db/db");

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log("router post\n");
    const title = req.body.new_task;
    const userId = req.session.userID || 1;
    fetchDatatypes(title).then((dataType) => {
      console.log({ dataType });
      let category = 1;
      if (dataType.includes("Book")) {
        category = 2;
      } else if (
        dataType.includes("TelevisionProgram") ||
        dataType.includes("Movies")
      ) {
        category = 3;
      } else if (dataType.includes("ExpandedFood")) {
        category = 4;
      } else if (!dataType.includes("Name")) {
        category = 5;
      }
      console.log("..............Reached Todo POST");
      newEntry({ userId, title, name: null, category_id: category }, db)
        .then((response) => {
          console.log("todo response: ", response);
          res.redirect("/");
        })
        .catch((error) => console.log(error));
    });
  });
  return router;
};
