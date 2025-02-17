const router = require("express").Router();
const { authMiddleware } = require("../middleware/middleware");
const templateController = require("../controllers/templateController");

router.post("/check", authMiddleware, templateController.checkTemplate);

module.exports = router;
