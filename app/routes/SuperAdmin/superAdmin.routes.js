const express = require("express");
const authRoute = require("./authRoutes"); 
const authOrganizationRoute = require("./authOrganization"); 
const userOrganizationRoute = require("./userOrganization"); 
const router = express.Router();

router.use("/auth", authRoute); 
router.use("/organization-auth", authOrganizationRoute); 
router.use("/organization-user", userOrganizationRoute); 


module.exports = router;
 