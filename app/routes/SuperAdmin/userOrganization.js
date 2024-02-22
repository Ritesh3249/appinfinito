const   express = require( "express");
const OrganizationController = require( "../../controllers/organization/organization.user.controller");  
const { isAuthSuperAdmin } = require("../../middlewares/isAuth")
const router = express.Router();
  
router.get("/get-all-organization",isAuthSuperAdmin, OrganizationController.getAllOrganization); 
router.get("/get-organization-by-id",isAuthSuperAdmin, OrganizationController.getOrganizationById); 
router.post("/update-org-by-super-admin",isAuthSuperAdmin, OrganizationController.updateOrganization); 
router.post("/delete-org-by-super-admin",isAuthSuperAdmin, OrganizationController.deleteOrganization); 

module.exports = router;
