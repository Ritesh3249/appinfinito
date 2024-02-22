const   Router = require( "express");
const OrganizationServiceController = require( "../../controllers/organization/organization.services.controller");  
const { isAuthOrganization } = require("../../middlewares/isAuth")
const router = Router();



router.post("/create-service",isAuthOrganization, OrganizationServiceController.createService); 
router.get("/get-all-service",isAuthOrganization, OrganizationServiceController.getAllService); 
router.get("/get-service-by-id",isAuthOrganization, OrganizationServiceController.getServiceById); 
router.post("/update-service",isAuthOrganization, OrganizationServiceController.updateService); 
router.post("/delete-service",isAuthOrganization, OrganizationServiceController.deleteService); 


module.exports = router;
