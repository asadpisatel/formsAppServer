const router = require("express").Router();
const personalController = require("../controllers/personalController");
const { authMiddleware } = require("../middleware/middleware");

router.get("/templates", authMiddleware, personalController.templates);
router.post(
  "/templates/delete",
  authMiddleware,
  personalController.deleteTemplates
);

module.exports = router;
