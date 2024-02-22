const   Router = require( "express");
const OrganizationTestimonialController = require( "../../controllers/User/user.testimonials.controller");  
const { isAuthOrganization } = require("../../middlewares/isAuth")
const router = Router();


 
router.get("/get-all-testimonial", OrganizationTestimonialController.getAllTestimonial);  
 

module.exports = router;
