const createHttpError = require("http-errors");
const message = require("../../messages/message");
const Services = require("../../model/Organization/Service");

const organizationServiceValidation = require("../../validators/Organization.services.validator");
const { calculatePercentageDiscount } = require("../../services/common.service");
const { findAlreadyExists, findNotExists } = require("../../services/validation.service");
const { create, getAll, getById, updateById, deleteById } = require("../../services/crud.service");
const SubCategory = require("../../model/Organization/SubCategory");
const { createSlotForService } = require("../../helpers/Cron/cron");


// function calculatePercentageDiscount(originalPrice, discountedPrice) {
//   if (originalPrice <= 0) {
//     throw createHttpError.NotAcceptable("Original price must be greater than 0");
//   }

//   if (discountedPrice < 0 || discountedPrice > originalPrice) {
//     throw createHttpError.NotAcceptable("Discounted price must be between 0 and the original price");
//   }

//   const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
//   return discountPercentage;
// }
class OrganizationServicesController {

  async createService(req, res) {
    const bodyData = await organizationServiceValidation.validateService(req.body)
    const { org_id } = req.user;

    let { service_name, sub_category_id, price, discounted_price,slot_duration } = bodyData;

    bodyData.percentage_discounted_price = calculatePercentageDiscount(price, discounted_price).toFixed(2)

    if (!discounted_price || discounted_price == '' || discounted_price == '0') {

      bodyData.percentage_discounted_price = '0'

    }

    bodyData.org_id = org_id;

    // If Service already exists

    await findAlreadyExists(Services, { service_name, org_id, sub_category_id, isDeleted: false }, message.validation.serviceExists)

    // If sub category not exists
    
    let findTheCategory = await findNotExists(SubCategory, {
      id: sub_category_id,
      org_id,
      isDeleted: false
    }, message.validation.subCategoryNotExists)

    
    bodyData.category_id = findTheCategory.category_id

    // Split the time string into hours and minutes
    const [hours, minutes] = slot_duration.split(':').map(Number);

    // Convert hours to minutes and add to the existing minutes
    const totalMinutes = (hours * 60) + minutes;

    bodyData.slot_duration = totalMinutes;

    // when the new service create for this service slot will create automatically 
    createSlotForService(service_name, org_id,totalMinutes)
    await create(Services, bodyData, message.Service.created, res)
     

  }
  async getAllService(req, res) { 
    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""
    const sub_category_id = req.query?.sub_category_id ;
    const category_id = req.query?.category_id ;
    search = search.toLowerCase()

    const { org_id } = req.user;
 
    if (sub_category_id) {

      await getAll(Services, { sub_category_id, org_id }, "All Services", res, page, limit, search, "service_name")

    } else if(category_id){

      await getAll(Services, {category_id, org_id }, "All Services", res, page, limit, search, "service_name")

    }else{
      await getAll(Services, { org_id }, "All Services", res, page, limit, search, "service_name")

    } 

  }
  async getServiceById(req, res) {
    let { service_id } = req.query || '0';
    let { org_id } = req.user;
    await findNotExists(Services, { org_id, id: service_id }, message.validation.serviceNotExists)
    
    let data = await Services.findOne({
      where: { org_id, id: service_id, isDeleted: false },

      include: [
        {
          model: SubCategory,
          attributes: [["id", "id"],
          ["sub_category_name", "name"]],
          where: { org_id, isDeleted: false },
          required: false
        },
        {
          model: Category,
          attributes:  [
            ["id", "id"],
            ["category_name", "name"],  
          ],
          where: { org_id, isDeleted: false },
          required: false
        }
      ]
      , attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] }
    })


    return res.status(200).send({ message: "Service by id", data })



  }

  async updateService(req, res) {
    const bodyData = await organizationServiceValidation.validateUpdateService(req.body)
    const { org_id } = req.user;


    await findNotExists(Services, { org_id, id: bodyData.service_id }, message.validation.serviceNotExists)

    await updateById(Services, bodyData, message.Service.updated, res, { org_id, id: bodyData.service_id })

    

  }
  async deleteService(req, res) {
    const { service_id } = req.body;
    const { org_id } = req.user;

    await findNotExists(Services, { org_id, id: service_id }, message.validation.serviceNotExists)

    await deleteById(Services, { org_id, id: service_id }, message.Service.deleted, res)
 

  }


}
module.exports = new OrganizationServicesController();

