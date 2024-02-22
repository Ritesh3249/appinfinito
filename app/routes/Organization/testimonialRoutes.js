const   Router = require( "express");
const OrganizationTestimonialController = require( "../../controllers/organization/organization.testimonials.controller");  
const { isAuthOrganization } = require("../../middlewares/isAuth")
const router = Router();



router.post("/create-testimonial",isAuthOrganization, OrganizationTestimonialController.createTestimonial); 
router.get("/get-all-testimonial",isAuthOrganization, OrganizationTestimonialController.getAllTestimonial); 
router.get("/get-testimonial-by-id",isAuthOrganization, OrganizationTestimonialController.getTestimonialById); 
router.post("/update-testimonial",isAuthOrganization, OrganizationTestimonialController.updateTestimonial); 
router.post("/delete-testimonial",isAuthOrganization, OrganizationTestimonialController.deleteTestimonial); 

 

module.exports = router;
