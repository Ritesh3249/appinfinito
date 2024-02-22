const createHttpError = require("http-errors");
const message = require("../../messages/message"); 
 const {  getAll, getAllWithSingleImageUrl } = require("../../services/crud.service");
const Testimonial = require("../../model/Organization/Testimonial");
const { findNotExists } = require("../../services/validation.service");
const Organization = require("../../model/Organization/Organization");

class OrganizationTestimonialController {
 
  async getAllTestimonial(req, res) {
    // const org_id = req.query?.org_id;
    const org_id = req.headers?.org_id
    if(!org_id){
        throw createHttpError.NotAcceptable("Organization Id is required")
    }
    await findNotExists(Organization,{org_id},message.validation.organizationNotExist)

    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""
    // const { sub_category_id } = req.query || '0';
    
    await getAllWithSingleImageUrl(Testimonial,{  org_id },message.Testimonial.getAll,res,page,limit,search,"name")
    

  }
   
  


}
module.exports = new OrganizationTestimonialController();

