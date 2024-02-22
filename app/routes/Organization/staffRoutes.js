const   Router = require( "express");
const OrganizationStaffController = require( "../../controllers/organization/organization.staff.controller");  
const { isAuthOrganization } = require("../../middlewares/isAuth")
const router = Router();



router.post("/create-staff",isAuthOrganization, OrganizationStaffController.createStaff); 
router.get("/get-all-staff",isAuthOrganization, OrganizationStaffController.getAllStaff); 
router.get("/get-staff-by-id",isAuthOrganization, OrganizationStaffController.getStaffById); 
router.post("/update-staff",isAuthOrganization, OrganizationStaffController.updateStaff); 
router.post("/delete-staff",isAuthOrganization, OrganizationStaffController.deleteStaff); 

module.exports = router;
