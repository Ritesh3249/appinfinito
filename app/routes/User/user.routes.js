const express = require("express");
 const bannerRoutes = require("./bannerRoutes")
 const testimonialRoutes = require("./testimonialRoutes")
 const categoryRoutes = require("./categoryRoutes")
 const slotRoutes = require("./slotRoutes")
 const authRoutes = require("./authRoutes")
const router = express.Router();
 
router.use("/banner", bannerRoutes); 
router.use("/testimonial", testimonialRoutes); 
router.use("/category", categoryRoutes); 
router.use("/slot", slotRoutes);
router.use("/auth", authRoutes);



module.exports = router;
