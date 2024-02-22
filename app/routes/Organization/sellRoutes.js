const   Router = require( "express");
const OrganizationSellController = require( "../../controllers/organization/organization.sell.controller");  
const { isAuthOrganization } = require("../../middlewares/isAuth")
const router = Router();



router.post("/create-sell-item",isAuthOrganization, OrganizationSellController.createSell);  
router.post("/return-sell-item",isAuthOrganization, OrganizationSellController.returnSellItem);  
router.get("/get-all-sell-item",isAuthOrganization, OrganizationSellController.getAllSell);  
router.get("/get-sell-by-id",isAuthOrganization, OrganizationSellController.getSellById);  
router.post("/update-sell-item",isAuthOrganization, OrganizationSellController.updateSellItem);  
router.post("/delete-sell-item",isAuthOrganization, OrganizationSellController.deleteSellItem);  

 

module.exports = router;
