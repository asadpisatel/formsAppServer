const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/registration", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/get_users", userController.getUsers);
router.post("/block", userController.blockUsers);
router.post("/unblock", userController.unblockUsers);
router.post("/delete", userController.deleteUsers);
router.post("/make_admin", userController.makeAdminUsers);
router.post("/remove_admin", userController.removeAdminUsers);

module.exports = router;
