const   Router = require( "express");
const OrganizationController = require( "../../controllers/User/user.category.controller");  
const router = Router(); 

router.get("/get-all-category", OrganizationController.getAllCategory); 
router.get("/get-is-home", OrganizationController.getIsHome); 
router.get("/get-is-menu", OrganizationController.getIsMenu); 



module.exports = router;
