const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const  { joiPasswordExtendCore } = require( "joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class BannerValidator  extends JoiValidator {
  

  

  validateBanner(obj) {
    return this.validate({
      
      image_url: Joi.array().required(), 
      status:Joi.boolean().required(),
      type:Joi.string().required(),
      type_id:Joi.string().required(),
      type_name:Joi.string().allow(null,"").required()
      // created_by: Joi.number().integer().required(),
      // org_id: Joi.string().required(),
    }, obj);
  }

  validateUpdateBanner(obj) {
    return this.validate({
       
      banner_id: Joi.string().max(255).required(),
      image_url: Joi.array(), 
      type:Joi.string(),
      type_id:Joi.string(),
      type_name:Joi.string(),
      status:Joi.boolean()
    }, obj);
  } 
 
}

module.exports = new BannerValidator ();
