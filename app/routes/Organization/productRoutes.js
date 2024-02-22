const   Router = require( "express");
const OrganizationProductController = require( "../../controllers/organization/organization.products.controller");  
const { isAuthOrganization } = require("../../middlewares/isAuth")
const router = Router();



router.post("/create-product",isAuthOrganization, OrganizationProductController.createProduct); 
router.get("/get-all-product",isAuthOrganization, OrganizationProductController.getAllProduct); 
router.get("/get-product-by-id",isAuthOrganization, OrganizationProductController.getProductById); 
router.post("/update-product",isAuthOrganization, OrganizationProductController.updateProduct); 
router.post("/delete-product",isAuthOrganization, OrganizationProductController.deleteProduct); 

 

module.exports = router;
