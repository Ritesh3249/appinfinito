const   Router = require( "express");
const OrganizationVendorController = require( "../../controllers/organization/organization.vendor.controller");  
const { isAuthOrganization } = require("../../middlewares/isAuth")
const router = Router();



router.post("/create-vendor",isAuthOrganization, OrganizationVendorController.createVendor); 
router.get("/get-all-vendor",isAuthOrganization, OrganizationVendorController.getAllVendor); 
router.get("/get-vendor-by-id",isAuthOrganization, OrganizationVendorController.getVendorById); 
router.post("/update-vendor",isAuthOrganization, OrganizationVendorController.updateVendor); 
router.post("/delete-vendor",isAuthOrganization, OrganizationVendorController.deleteVendor); 

 

module.exports = router;
