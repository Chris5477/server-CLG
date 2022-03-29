const userControllers = require("../controllers/user");
const express = require("express");
const router = express.Router();

router.post("/", userControllers.createUser);

module.exports = router;
