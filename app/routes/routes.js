const express = require("express");
const router = express.Router(); 
const superAdminRoutes = require("./SuperAdmin/superAdmin.routes"); 
const organizationRoutes = require("./Organization/organization.routes");
const commonRoutes = require("./Common/commonRoutes");
const userRoutes = require("./User/user.routes");
const syncDb  = require("../helpers/SyncDb/syncDb");
const { createInitialSlots } = require("../helpers/Cron/cron");

router.use("/super-admin", superAdminRoutes); 
router.use("/admin", organizationRoutes)
router.use("/common", commonRoutes)
router.use("/user", userRoutes)


// Routes to sync the db
router.get("/syncDb",syncDb)
router.get("/create-slot",createInitialSlots)
module.exports = router;