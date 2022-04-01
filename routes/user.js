const userControllers = require("../controllers/user");
const express = require("express");
const router = express.Router();

router.post("/signup", userControllers.createUser);
router.post("/login", userControllers.login);
router.get("/:id", userControllers.refreshData)
router.delete("/:id", userControllers.deleteUser)
router.put("/:id", userControllers.addCard)


module.exports = router;
