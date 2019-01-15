const router = require("express").Router();
const apiRoutes = require("./lightning");

// Book routes
router.use("/charge", apiRoutes);

module.exports = router;
