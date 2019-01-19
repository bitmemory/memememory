const router = require("express").Router();
const apiRoutes = require("./hook");

// Book routes
router.use("/charge/:id", apiRoutes);

module.exports = router;
