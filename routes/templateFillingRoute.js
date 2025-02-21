const router = require("express").Router();
const { authMiddleware } = require("../middleware/middleware");
const templateFillingController = require("../controllers/templateFillingController");

router.post(
  "/:id/fill",
  authMiddleware,
  templateFillingController.createResponse
);

module.exports = router;
