const router = require("express").Router();
const { authMiddleware } = require("../middleware/middleware");
const templateController = require("../controllers/templateController");

router.post("/create", authMiddleware, templateController.createTemplate);
router.post("/check", templateController.checkTemplate);
router.get("/:id/general-settings", templateController.getGeneralSettings);
router.put(
  "/:id/general-settings",
  authMiddleware,
  templateController.updateGeneralSettings
);

router.get("/:id/questions", templateController.getQuestions);
router.put(
  "/:id/questions",
  authMiddleware,
  templateController.updateQuestions
);

module.exports = router;
