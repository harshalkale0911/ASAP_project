const express = require("express");
const { getDogNames, addDogName } = require("../controllers/dogController");

const router = express.Router();

router.get("/", getDogNames);
router.post("/", addDogName);

module.exports = router;
