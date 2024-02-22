const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const  { joiPasswordExtendCore } = require( "joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class StockValidator  extends JoiValidator {
  

  
  validateCreateStock(obj) {
    return this.validate({
      item_name: Joi.string().max(255).required(),
      specification: Joi.object(),
      image_url: Joi.array(),
      // quantity:Joi.string().required(),
      description:Joi.string().allow(null,""),
      sku:Joi.string().allow(null,""),
      hns_code:Joi.string().allow(null,"")

    }, obj);
  }

  validateUpdateStockProduct(obj) {
    return this.validate({
      item_name: Joi.string().max(255),
      specification: Joi.object(),
      image_url: Joi.array(),
      // quantity:Joi.string(),
      item_id:Joi.string().required(),
      description:Joi.string(),
      sku:Joi.string(),
      hns_code:Joi.string()
    }, obj);
  } 
 
}

module.exports = new StockValidator ();
