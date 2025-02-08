const router = require("express").Router();
const userController = require("../controllers/userController");
const { authMiddleware } = require("../middleware/middleware");

router.post("/registration", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.get("/me", authMiddleware, userController.getMe);

module.exports = router;
