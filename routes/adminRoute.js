const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { authMiddleware, adminMiddleware } = require("../middleware/middleware");

router.get(
  "/get_users",
  authMiddleware,
  adminMiddleware,
  adminController.getUsers
);
router.post(
  "/block",
  authMiddleware,
  adminMiddleware,
  adminController.blockUsers
);
router.post(
  "/unblock",
  authMiddleware,
  adminMiddleware,
  adminController.unblockUsers
);
router.post(
  "/delete",
  authMiddleware,
  adminMiddleware,
  adminController.deleteUsers
);
router.post(
  "/make_admin",
  authMiddleware,
  adminMiddleware,
  adminController.makeAdminUsers
);
router.post(
  "/remove_admin",
  authMiddleware,
  adminMiddleware,
  adminController.removeAdminUsers
);

module.exports = router;
