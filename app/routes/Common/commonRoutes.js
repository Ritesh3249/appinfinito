const express = require("express");
const { isAuthOrganization } = require("../../middlewares/isAuth");
const CommonController = require("../../controllers/Common/common.controller")

const UserSlotController = require( "../../controllers/Common/common.controller");  
const router = express.Router();
 
router.get("/get-discounted-price",isAuthOrganization, CommonController.getDiscountedPrice); 
router.post("/image-upload",isAuthOrganization, CommonController.uploadImage); 
router.get("/get-all-count",isAuthOrganization, CommonController.getAllCount); 


router.get("/get-slot-by-service", UserSlotController.getSlotFromTodaysDateByService); 
router.get("/get-all-slot", UserSlotController.getAllSlots); 
module.exports = router;
