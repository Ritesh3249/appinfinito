const   Router = require( "express");
const UserSlotController = require( "../../controllers/User/user.slot.controller");  
const { isAuthOrganization, isAuthUser } = require("../../middlewares/isAuth")
const router = Router();


router.post("/book-slot",isAuthUser, UserSlotController.bookASlot); 

 

module.exports = router;
