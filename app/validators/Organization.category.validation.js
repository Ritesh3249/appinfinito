const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const  { joiPasswordExtendCore } = require( "joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class CategoryValidator  extends JoiValidator {
  

  validateCategory(obj) {
    return this.validate({
      category_name: Joi.string().max(255).required(),
      image_url: Joi.array().required(),
      isMenu:Joi.boolean(),
      isHome:Joi.boolean(),
      status:Joi.boolean().required()
      // isProduct:Joi.boolean().required()
      // created_by: Joi.number().integer().required(),
      // org_id: Joi.string().required(),
    }, obj);
  }
  
  validateUpdatedCategory(obj) {
    return this.validate({
      category_name: Joi.string(),
      category_id: Joi.string().max(255).required(),
      image_url: Joi.array().allow(null,""), 
      isMenu:Joi.boolean(),
      isHome:Joi.boolean(),
      // isProduct:Joi.boolean(),
      status:Joi.boolean()
    }, obj);
  } 


  validateSubCategory(obj) {
    return this.validate({
      sub_category_name: Joi.string().max(255).required(),
      category_id: Joi.string().max(255).required(),
      image_url: Joi.array().required(), 
      status:Joi.boolean()
      // created_by: Joi.number().integer().required(),
      // org_id: Joi.string().required(),
    }, obj);
  }

  validateUpdatedSubCategory(obj) {
    return this.validate({
      sub_category_name: Joi.string(),
      sub_category_id: Joi.string().max(255).required(),
      category_id:Joi.string(),
      image_url: Joi.array(), 
      status:Joi.boolean()
    }, obj);
  } 
 
}

module.exports = new CategoryValidator ();
