const   Router = require( "express");
const OrganizationSlotController = require( "../../controllers/organization/organization.slot.controller");  
const { isAuthOrganization } = require("../../middlewares/isAuth")
const router = Router();



router.get("/get-all-booked-slot",isAuthOrganization, OrganizationSlotController.getAllBookedSlotList);  
router.post("/complete-booked-slot",isAuthOrganization, OrganizationSlotController.markTheSlotBooked);  

 

module.exports = router;
