const   Router = require( "express");
const OrganizationWorkingDaysController = require( "../../controllers/organization/organization.workingDays.controller");  
const { isAuthOrganization } = require("../../middlewares/isAuth")
const router = Router();



router.post("/create-working-days",isAuthOrganization, OrganizationWorkingDaysController.updateWorkingDays);  

 

module.exports = router;
