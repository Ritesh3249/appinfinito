const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const  { joiPasswordExtendCore } = require( "joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class SellValidator  extends JoiValidator {
  

  
 
  validateCreateSell(obj) {
    return this.validate({
      item_name: Joi.string().required(),
      // stock_item_id:Joi.string().required(),
      quantity:Joi.string().required(),
       sell_price:Joi.string().required(),
      sell_type:Joi.string().required(),
      // return_reason:Joi.string().allow(null,""), 
      comment: Joi.string().allow(null,""),
     
    }, obj);
  }
  validateReturnSell(obj) {
    return this.validate({
       
      item_name:Joi.string().required(),
      sell_id:Joi.string().required(),
      return_reason:Joi.string().allow(null,""), 
      return_quantity: Joi.string().required()
    }, obj);
  } 
  validateUpdateSell(obj) {
    return this.validate({
       
      // stock_id:Joi.string().required(),
      sell_item_name:Joi.string().required(),
      sell_item_id:Joi.string().required(),
      update_quantity:Joi.string(),
      comment: Joi.string(),
      sell_type:Joi.string(),
      return_reason:Joi.string()
    }, obj);
  }
 
}

module.exports = new SellValidator ();
