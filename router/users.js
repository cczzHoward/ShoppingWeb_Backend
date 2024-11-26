const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // #swagger.description = '取得所有使用者'
  res.send("This is the root of the users router");
});

module.exports = router;
