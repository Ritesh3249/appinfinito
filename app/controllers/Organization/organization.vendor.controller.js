const createHttpError = require("http-errors");
const message = require("../../messages/message");
const Vendor = require("../../model/Organization/Vendor");

const organizationVendorValidation = require("../../validators/Organization.vendor.validator");
const { calculatePercentageDiscount } = require("../../services/common.service");
const { findNotExists, findAlreadyExists } = require("../../services/validation.service");
const { create, getAll, getById, updateById, deleteById } = require("../../services/crud.service");
const SubCategory = require("../../model/Organization/SubCategory");
const Category = require("../../model/Organization/Category");
const { Op } = require("sequelize");


// function calculatePercentageDiscount(originalPrice, discountedPrice) {
//   if (originalPrice <= 0) {
//     throw createHttpError.NotAcceptable("Original price must be greater than 0");
//   }

//   if (discountedPrice < 0 || discountedPrice > originalPrice) {
//     throw createHttpError.NotAcceptable("Discounted price must be between 0 and the original price");
//   }

//   const discountPercentage = ((originalPrice - (discountedPrice || '0')) / originalPrice) * 100;
//   return discountPercentage;
// }
class OrganizationVendorController {

  async createVendor(req, res) {

    // const { product_name, image_url, sub_category_id, price, discounted_price, description } = await organizationVendorValidation.validateProduct(req.body)
    const bodyData = await organizationVendorValidation.validateVendor(req.body)
    const { org_id } = req.user;
 
    
    
    bodyData.org_id = org_id;
     
 
    bodyData.vendor_name = await bodyData.vendor_name.toLowerCase()
    await findAlreadyExists(Vendor, {
      vendor_name:bodyData.vendor_name,
      org_id,
     }, message.validation.vendorExists)
 
 
    await create(Vendor, bodyData, message.Vendor.created, res)
    
  }
  async getAllVendor(req, res) {
    // const {sub_category_id} = req.body;
    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""
    search = search.toLowerCase()

    const { org_id } = req.user;


    // let data = await Vendor.findAll({ where: { sub_category_id, org_id, isDeleted: false }, offset: newPage, limit: newLimit, order: [['id', 'ASC']], attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] }, raw: true })
     
      await getAll(Vendor, {org_id }, message.Vendor.getAll, res, page, limit, search, "vendor_name")

    

    // return res.status(200).send({ message: "All Vendor", data })

  }
  async getVendorById(req, res) {
    let { vendor_id } = req.query || '0';
    let { org_id } = req.user;

    await findNotExists(Vendor, {
      id:vendor_id,
      org_id,
      isDeleted: false
    }, message.validation.vendorNotExists)

    await getById(Vendor,{ org_id, id:vendor_id,},"Vendor by id",res)

    
 

  }

  async updateVendor(req, res) {
    const bodyData = await organizationVendorValidation.validateUpdateVendor(req.body)
    const { org_id } = req.user;
    // await findNotExists(Vendor,{ org_id, id: bodyData.product_id},message.validation.productNotExists)

    // let productDetails = await Vendor.findOne({ where: { org_id, id: bodyData.product_id, isDeleted: false }, raw: true })
      await findNotExists(Vendor, { org_id, id: bodyData.vendor_id }, message.validation.vendorNotExists)
    

    await updateById(Vendor, bodyData, message.Vendor.updated, res, { org_id, id:  bodyData.vendor_id})

 

  }
  async deleteVendor(req, res) {
    const {  vendor_id } = req.body;

    const { org_id } = req.user;

    await findNotExists(Vendor, {
      id: vendor_id,
      org_id
    }, message.validation.vendorNotExists)

     

    await deleteById(Vendor, { id: vendor_id }, message.Vendor.deleted, res)
  }


}
module.exports = new OrganizationVendorController();

