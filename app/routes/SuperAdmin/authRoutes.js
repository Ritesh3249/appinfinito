const   Router = require( "express");
const superAdminAuthController = require( "../../controllers/SuperAdmin/superAdmin.auth.controller");  
const router = Router();

router.post("/login", superAdminAuthController.login);
router.post("/register", superAdminAuthController.register); 


module.exports = router;

