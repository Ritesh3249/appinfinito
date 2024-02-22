const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const  { joiPasswordExtendCore } = require( "joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class ProductValidator  extends JoiValidator {
  

  

  validateStaff(obj) {
    return this.validate({
      staff_name: Joi.string().max(255).required(),
      image_url: Joi.array().required(), 
      gender:Joi.string().required(),
      mobile: Joi.string().max(50).required(),
      state: Joi.string().max(100).required(),
      city: Joi.string().max(100).required(),
      address_line_1: Joi.string().max(255).allow(null,""),
      address_line_2: Joi.string().max(255).allow(null,""),
      status:Joi.boolean().required(),
      // status:Joi.boolean()
      // created_by: Joi.number().integer().required(),
      // org_id: Joi.string().required(),
    }, obj);
  }

  validateUpdateStaff(obj) {
    return this.validate({
      staff_name: Joi.string(),
      staff_id: Joi.string().required(),
      image_url: Joi.array(), 
      gender:Joi.string() ,
      mobile: Joi.string() ,
      state: Joi.string() ,
      city: Joi.string() ,
      address_line_1: Joi.string() ,
      address_line_2: Joi.string() ,
      status:Joi.boolean()
    }, obj);
  } 
 
}

module.exports = new ProductValidator ();
