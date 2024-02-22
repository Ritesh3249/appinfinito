const   Router = require( "express");
const UserAuthController = require( "../../controllers/User/user.auth.controller");  
const router = Router();

 
router.post("/login", UserAuthController.login);
router.post("/register", UserAuthController.register); 

module.exports = router;
