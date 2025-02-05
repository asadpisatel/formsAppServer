const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/registration", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/get_users", userController.getUsers);
router.post("/block", userController.blockUsers);

module.exports = router;
