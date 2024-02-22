const   Router = require( "express");
const OrganizationBannerController = require( "../../controllers/organization/organization.banners.controller");  
const { isAuthOrganization } = require("../../middlewares/isAuth")
const router = Router();



router.post("/create-banner",isAuthOrganization, OrganizationBannerController.createBanner); 
router.get("/get-all-banner",isAuthOrganization, OrganizationBannerController.getAllBanner); 
router.get("/get-banner-by-id",isAuthOrganization, OrganizationBannerController.getBannerById); 
router.post("/update-banner",isAuthOrganization, OrganizationBannerController.updateBanner); 
router.post("/delete-banner",isAuthOrganization, OrganizationBannerController.deleteBanner); 

 

module.exports = router;
