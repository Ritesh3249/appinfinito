const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const  { joiPasswordExtendCore } = require( "joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class TestimonialValidator  extends JoiValidator {
  

  

  validateTestimonial(obj) {
    return this.validate({
      
      image_url: Joi.array().allow(null,""), 
      status:Joi.boolean().required(),
      destination:Joi.string().allow(null,""),
      text:Joi.string().required(),
      name:Joi.string().required()
      // created_by: Joi.number().integer().required(),
      // org_id: Joi.string().required(),
    }, obj);
  }

  validateUpdateTestimonial(obj) {
    return this.validate({
       testimonial_id: Joi.string().required(),
        image_url: Joi.array(), 
        status:Joi.boolean() ,
        destination:Joi.string() ,
        text:Joi.string() ,
        name:Joi.string() 
    }, obj);
  } 
 
}

module.exports = new TestimonialValidator ();
