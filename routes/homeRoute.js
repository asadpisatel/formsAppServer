const router = require("express").Router();
const homeController = require("../controllers/homeController");

router.get("/get-latest", homeController.getLatestTemplates);
router.get("/search", homeController.search);

module.exports = router;
