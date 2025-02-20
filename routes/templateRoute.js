const router = require("express").Router();
const { authMiddleware } = require("../middleware/middleware");
const templateController = require("../controllers/templateController");

router.post("/create", authMiddleware, templateController.createTemplate);
router.post("/check", authMiddleware, templateController.checkTemplate);
router.get(
  "/:id/general-settings",
  authMiddleware,
  templateController.getGeneralSettings
);
router.put(
  "/:id/general-settings",
  authMiddleware,
  templateController.updateGeneralSettings
);

router.get("/:id/questions", authMiddleware, templateController.getQuestions);
router.put(
  "/:id/questions",
  authMiddleware,
  templateController.updateQuestions
);

module.exports = router;
