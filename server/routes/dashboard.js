// server/routes/dashboard.js
const express = require("express");
const DashboardControllers = require("../controllers/dashboard.js");

const router = express.Router();

router.get("/products", DashboardControllers.ProductController);
router.get("/visitors", DashboardControllers.VisitorsController);

module.exports = router;
