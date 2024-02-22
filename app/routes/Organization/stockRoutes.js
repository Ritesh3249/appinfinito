const   Router = require( "express");
const OrganizationStockController = require( "../../controllers/organization/organization.stock.controller");  
const { isAuthOrganization } = require("../../middlewares/isAuth")
const router = Router();



router.post("/create-stock",isAuthOrganization, OrganizationStockController.createStock);  
router.post("/update-stock",isAuthOrganization, OrganizationStockController.updateStock);  
router.get("/get-all-stock",isAuthOrganization, OrganizationStockController.getAllStock);  
router.get("/get-stock-by-id",isAuthOrganization, OrganizationStockController.getStockById);  
router.post("/delete-stock-item",isAuthOrganization, OrganizationStockController.deleteStock); 

 

module.exports = router;
