const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const  { joiPasswordExtendCore } = require( "joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class ProductValidator  extends JoiValidator {
  

  

  validateProduct(obj) {
    return this.validate({
      product_name: Joi.string().max(255).required(),
      sub_category_id: Joi.string().max(255).required(),
      image_url: Joi.array().required(), 
      price:Joi.string().required(),
      discounted_price:Joi.string().allow(null,""),
      description: Joi.string().allow(null,""),
      specification: Joi.object(),
      status:Joi.boolean().required(),
      // status:Joi.boolean()
      // created_by: Joi.number().integer().required(),
      // org_id: Joi.string().required(),
    }, obj);
  }

  validateUpdateProduct(obj) {
    return this.validate({
      product_name: Joi.string(),
      product_id: Joi.string().max(255).required(),
      image_url: Joi.array(), 
      price:Joi.string().max(255),
      discounted_price:Joi.string(),
      description: Joi.string(),
      specification:Joi.object(),
      status:Joi.boolean()
    }, obj);
  } 
 
}

module.exports = new ProductValidator ();
