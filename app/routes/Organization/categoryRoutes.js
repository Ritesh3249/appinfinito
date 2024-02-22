const   Router = require( "express");
const OrganizationController = require( "../../controllers/organization/organization.category.controller");  
const { isAuthOrganization } = require("../../middlewares/isAuth")
const router = Router();

router.post("/create-category",isAuthOrganization, OrganizationController.createCategory); 
router.get("/get-all-category",isAuthOrganization, OrganizationController.getAllCategory); 
router.get("/get-is-home",isAuthOrganization, OrganizationController.getIsHome); 
router.get("/get-is-menu",isAuthOrganization, OrganizationController.getIsMenu); 
router.get("/get-category-by-id",isAuthOrganization, OrganizationController.getCategoryById); 
router.post("/update-category",isAuthOrganization, OrganizationController.updateCategory); 
router.post("/delete-category",isAuthOrganization, OrganizationController.deleteCategory); 

//Sub category

router.post("/create-sub-category",isAuthOrganization, OrganizationController.createSubCategory); 
router.get("/get-all-sub-category",isAuthOrganization, OrganizationController.getAllSubCategoryByCategory); 
router.get("/get-sub-category-by-id",isAuthOrganization, OrganizationController.getSubCategoryById); 
router.post("/update-sub-category",isAuthOrganization, OrganizationController.updateSubCategory); 
router.post("/delete-sub-category",isAuthOrganization, OrganizationController.deleteSubCategory); 

module.exports = router;
