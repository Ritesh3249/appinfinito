const   Router = require( "express");
const OrganizationPurchaseController = require( "../../controllers/organization/organization.purchase.controller");  
const { isAuthOrganization } = require("../../middlewares/isAuth")
const router = Router();



router.post("/purchase-product",isAuthOrganization, OrganizationPurchaseController.purchaseProduct);  
router.post("/update-purchased-product",isAuthOrganization, OrganizationPurchaseController.updatePurchaseProduct);  
router.get("/get-all-purchased-product",isAuthOrganization, OrganizationPurchaseController.getAllPurchaseProduct);  
router.get("/get-purchased-product-by-id",isAuthOrganization, OrganizationPurchaseController.getPurchaseProductById);  
router.post("/delete-purchased-product",isAuthOrganization, OrganizationPurchaseController.deletePurchaseProduct); 

 
 

module.exports = router;
