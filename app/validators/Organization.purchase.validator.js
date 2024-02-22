const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const { joiPasswordExtendCore } = require("joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class PurchaseProductValidator extends JoiValidator {




  validatePurchaseProduct(obj) {
    return this.validate({
      item_name: Joi.string().max(255).required(),
      comment: Joi.string().allow(null, ""),

      vendor_name: Joi.string().required(),
      mrp: Joi.string().required(),
      // sell_price:Joi.string().required(),
      buyer_price: Joi.string().required(),
      quantity: Joi.string().required()
    }, obj);
  }
  validateUpdatePurchaseProduct(obj) {
    return this.validate({
      // item_name: Joi.string(),
      comment: Joi.string(),
      vendor_name: Joi.string(),
      mrp: Joi.string(),
      // sell_price:Joi.string(),
      buyer_price: Joi.string(),
      quantity: Joi.string(),
      purchase_item_id: Joi.string().required()
    }, obj);
  }

}

module.exports = new PurchaseProductValidator();
