const express = require("express");
 const categoryRoute = require("./categoryRoutes")
 const serviceRoute = require("./serviceRoutes")
 const staffRoute = require("./staffRoutes")
 const productRoute = require("./productRoutes")
 const bannerRoute = require("./bannerRoutes")
 const testimonialRoute = require("./testimonialRoutes")
 const purchaseRoute = require("./purchaseRoutes")
 const stockRoute = require("./stockRoutes")
 const sellRoutes = require("./sellRoutes")
 const vendorRoutes = require("./vendorRoutes")
 const workingDaysRoutes = require("./workingDaysRoutes")
 const slotRoutes = require("./slotRoutes")
const router = express.Router();
 
router.use("/category", categoryRoute); 
router.use("/service", serviceRoute); 
router.use("/product", productRoute); 
router.use("/staff", staffRoute); 
router.use("/banner", bannerRoute); 
router.use("/testimonial", testimonialRoute); 
router.use("/purchase", purchaseRoute); 
router.use("/stock", stockRoute); 
router.use("/sell", sellRoutes); 
router.use("/vendor", vendorRoutes); 
router.use("/working-day", workingDaysRoutes); 
router.use("/slot", slotRoutes); 


module.exports = router;
