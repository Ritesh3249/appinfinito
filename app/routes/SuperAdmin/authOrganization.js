const   Router = require( "express");
const OrganizationController = require( "../../controllers/organization/organization.auth.controller");  
const { isAuthSuperAdmin } = require("../../middlewares/isAuth")
const router = Router();

router.post("/create-password", OrganizationController.createPasswordOfOrg); 
router.post("/login", OrganizationController.login);

// CRUD => Organization
router.post("/create-organization", isAuthSuperAdmin, OrganizationController.register); 
// router.get("/get-all-organization",isAuthSuperAdmin, OrganizationController.getAllOrganization); 
// router.post("/update-org-by-super-admin",isAuthSuperAdmin, OrganizationController.updateOrganization); 
// router.post("/delete-org-by-super-admin",isAuthSuperAdmin, OrganizationController.deleteOrganization); 

module.exports = router;
