const createHttpError = require("http-errors");
const commonExclude = ['createdAt', 'updatedAt', 'isDeleted']

  class ValidationService   {

  async findAlreadyExists(table,data,validationMessage) {
    data.isDeleted = false;
    const existingData = await table.findOne({
      where:data,
      raw: true
    });
    
    if (existingData) {
      throw createHttpError.NotAcceptable(validationMessage)
    }
    return existingData;
  }

   
  async findNotExists(table,data,validationMessage) {
    data.isDeleted = false;
    const existingData = await table.findOne({
      where:data,
      attributes: { exclude: commonExclude },
      raw: true
    });
    
    if (!existingData) {
      throw createHttpError.NotAcceptable(validationMessage)
    }
    return existingData;
  } 

 
}

module.exports = new ValidationService();