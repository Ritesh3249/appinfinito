const createHttpError = require("http-errors");

class ValidationCommon   {

    calculatePercentageDiscount(originalPrice, discountedPrice = '0') {
        if (originalPrice <= 0) {
          throw createHttpError.NotAcceptable("price must be greater than 0");
        }
      
        if (discountedPrice < 0 || discountedPrice > originalPrice) {
          throw createHttpError.NotAcceptable("Price must be greater the discounted price");
        }
      
        const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
        return discountPercentage;
      }
  
      
  
   
  }
  
  module.exports= new ValidationCommon();