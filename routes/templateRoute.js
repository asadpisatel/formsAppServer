const router = require("express").Router();
const { authMiddleware } = require("../middleware/middleware");
const templateController = require("../controllers/templateController");

router.post("/create", authMiddleware, templateController.createTemplate);
router.post("/check", authMiddleware, templateController.checkTemplate);
router.get("/:id", authMiddleware, templateController.getTemplate);
router.put("/update", authMiddleware, templateController.updateTemplate);

module.exports = router;
