const   Router = require( "express");
const OrganizationBannerController = require( "../../controllers/User/user.banners.controller");  
const router = Router();

 
router.get("/get-all-banner", OrganizationBannerController.getAllBanner);  

module.exports = router;
