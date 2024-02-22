const createHttpError = require("http-errors");
const message = require("../../messages/message"); 

const organizationTestimonialValidation = require("../../validators/Organization.testimonial.validator"); 
const { create, getAll, getById, updateById, deleteById } = require("../../services/crud.service");
const Testimonial = require("../../model/Organization/Testimonial");
const { findNotExists } = require("../../services/validation.service");

class OrganizationTestimonialController {

  async createTestimonial(req, res) {
    const bodyData = organizationTestimonialValidation.validateTestimonial(req.body)
    const {org_id} = req.user;
     bodyData.org_id = org_id
     await create(Testimonial,bodyData,message.Testimonial.created,res)
 
  }
  async getAllTestimonial(req, res) {
    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""
    search = search.toLowerCase()

    // const { sub_category_id } = req.query || '0';
    const { org_id } = req.user;
    await getAll(Testimonial,{  org_id },message.Testimonial.getAll,res,page,limit,search,"name")

  }
  async getTestimonialById(req, res) {
    let { testimonial_id } = req.query || '0';
    let { org_id } = req.user;

    await findNotExists(Testimonial,{
      id: testimonial_id,
      org_id, 
      isDeleted: false
    },message.validation.testimonialNotExists)

    await getById(Testimonial,{ org_id, id: testimonial_id},"Testimonial by id",res)

  }

  async updateTestimonial(req, res) {
    const bodyData=  await organizationTestimonialValidation.validateUpdateTestimonial(req.body)
         const {org_id} = req.user; 
      await findNotExists(Testimonial,{org_id,id:bodyData.testimonial_id},message.validation.testimonialNotExists)
      await updateById(Testimonial,bodyData,message.Testimonial.updated,res,{org_id,id:bodyData.testimonial_id})
      
  }
  async deleteTestimonial(req, res) {
    const { testimonial_id } = req.body;
  
    const { org_id } = req.user;

    await findNotExists(Testimonial,{
      id: testimonial_id,
      org_id
    },message.validation.TestimonialNotExists)

   
    await deleteById(Testimonial,{ id: testimonial_id },message.Testimonial.deleted ,res)
 
    
  }


}
module.exports = new OrganizationTestimonialController();

