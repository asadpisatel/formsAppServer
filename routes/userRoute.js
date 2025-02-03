const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/registration", userController.createUser);

module.exports = router;
