const userControllers = require("../controllers/user");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/signup", userControllers.createUser);
router.post("/login", userControllers.login);
router.get("/:id", userControllers.refreshData)
router.delete("/:id", auth, userControllers.deleteUser)
router.put("/card/:id", auth, userControllers.removeCard)
router.put("/:id", auth, userControllers.addCard)


module.exports = router;
