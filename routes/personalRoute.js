const router = require("express").Router();
const personalController = require("../controllers/personalController");
const { authMiddleware } = require("../middleware/middleware");

router.post("/templates", authMiddleware, personalController.templates);

module.exports = router;
