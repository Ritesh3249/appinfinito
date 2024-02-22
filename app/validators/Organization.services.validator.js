const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const  { joiPasswordExtendCore } = require( "joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class ServiceValidator  extends JoiValidator {
  

  

  validateService(obj) {
    return this.validate({
      service_name: Joi.string().max(255).required(),
      sub_category_id: Joi.string().max(255).required(),
      image_url: Joi.array().required(), 
      price:Joi.string().max(255).required(),
      discounted_price:Joi.string().allow(null,""),
      description: Joi.string().allow(null,""),
      specification: Joi.object(),
      slot_duration: Joi.string().required(),
      restricted_state:Joi.array(),
      restricted_city:Joi.array(),
      status:Joi.boolean().required(),
      // status:Joi.boolean()
      // created_by: Joi.number().integer().required(),
      // org_id: Joi.string().required(),
    }, obj);
  }

  validateUpdateService(obj) {
    return this.validate({
      service_name: Joi.string(),
      service_id: Joi.string().max(255).required(),
      image_url: Joi.array(), 
      price:Joi.string().max(255),
      discounted_price:Joi.string(),
      slot_duration: Joi.string(),
      restricted_state:Joi.array(),
      restricted_city:Joi.array(),
      description: Joi.string(),
      specification: Joi.object(),
      status:Joi.boolean()
    }, obj);
  } 
 
}

module.exports = new ServiceValidator ();
