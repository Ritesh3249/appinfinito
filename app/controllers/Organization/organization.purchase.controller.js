const createHttpError = require("http-errors");
const message = require("../../messages/message");
const organizationPurchaseValidation = require("../../validators/Organization.purchase.validator");

// const organizationPurchaseValidation = require("../../validators/Organization.purchase.validator");
const { findNotExists, findAlreadyExists } = require("../../services/validation.service");
const { create, getAll, getById, updateById, deleteById } = require("../../services/crud.service");
const { Op } = require("sequelize");
const Purchase = require("../../model/Organization/Purchase");
const Stock = require("../../model/Organization/Stock");
const Vendor = require("../../model/Organization/Vendor");


class OrganizationPurchaseController {


  async purchaseProduct(req, res) {
    const bodyData = await organizationPurchaseValidation.validatePurchaseProduct(req.body)
    const { org_id } = req.user;

    bodyData.item_name = await bodyData.item_name.toLowerCase() 

    let stockData = await findNotExists(Stock, {
      item_name: bodyData.item_name,
      org_id
    }, message.validation.StockNotExists)
     await findNotExists(Vendor, {
      vendor_name: bodyData.vendor_name,
      org_id
    }, message.validation.vendorNotExists)

    bodyData.org_id = org_id;

    await Stock.update({ quantity: (parseInt(stockData.quantity) + parseInt(bodyData.quantity)) },{where:{ org_id, item_name: bodyData.item_name }})
    await create(Purchase, bodyData, message.Purchase.created, res)

    // await updateById(Stock, { quantity: (parseInt(stockData.quantity) + parseInt(bodyData.quantity)) }, message.Purchase.updated, res, { org_id, item_name: bodyData.item_name })
  }
  
  async updatePurchaseProduct(req, res) {
    const bodyData = await organizationPurchaseValidation.validateUpdatePurchaseProduct(req.body)
    const { org_id } = req.user;
    await  findNotExists(Purchase, {
      id: bodyData.purchase_item_id,
      org_id
    }, message.validation.purchasedProductNotExists)
    const findPurchasedProduct = await Purchase.findOne({ where: { id: bodyData.purchase_item_id,org_id } })
    const findStockItem = await Stock.findOne({ where: { org_id, item_name: findPurchasedProduct.item_name } })
    if (bodyData?.quantity) {
      let findTheDifference = parseInt(bodyData.quantity - findPurchasedProduct.quantity); // find the difference 
  
      if( (findTheDifference)+parseInt( findStockItem.quantity) <0){
        throw createHttpError.NotAcceptable("Quantity exceeding its limit, check the sell item quantity or you are trying to change more then stock quantity")
      }
      await Stock.update({quantity:(findTheDifference)+parseInt( findStockItem.quantity)},{where: { org_id, item_name: findPurchasedProduct.item_name }})
      // await updateById(Stock, {quantity:(findTheDifference)+parseInt( findStockItem.quantity)}, message.Purchase.updated, res, { org_id, item_name: findPurchasedProduct.item_name })
      // delete bodyData.quantity
    }

    
    await updateById(Purchase, bodyData, message.Purchase.updated, res, { org_id, item_name: findPurchasedProduct.item_name })



  }

  async getAllPurchaseProduct(req, res) {

    const { org_id } = req.user;
    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""
    // let createdAt = req.query?.create-at || ""
    search = search.toLowerCase()


    // await getAll(Purchase, { org_id }, message.Purchase.getAll, res, page, limit, search, "item_name")
 
 
    search = search.toLowerCase()
    let newPage = 0
    let newLimit = parseInt(limit)

    if (parseInt(page) == 0) newPage = (parseInt(page)) * parseInt(limit)
    else newPage = (parseInt(page) - 1) * parseInt(limit)
    let status= {
        [Op.like]: `%${search || ''}%`,
    }
    // createdAt = {
    //   [Op.like]: `%${createdAt || ''}%`,
    // }
 

    let data = await Purchase.findAll({ where: {org_id,item_name:status
      
      // createdAt
      ,isDeleted:false}, offset: newPage, limit: newLimit, order: [['id', 'ASC']], attributes: { exclude: ["isDeleted"]}, raw: true })

    return res.status(200).send({ message: message.Purchase.getAll, data })



  }
  async getPurchaseProductById(req, res) {
    let { purchase_item_id } = req.query;
    let { org_id } = req.user;
    await findNotExists(Purchase, { org_id, id: purchase_item_id }, message.validation.purchasedProductNotExists)
    await getById(Purchase, { org_id, id: purchase_item_id }, "Product by id", res)

  }

  async deletePurchaseProduct(req, res) {
    const { purchase_item_id } = req.body;

    const { org_id } = req.user;
    await findNotExists(Purchase, { org_id, id: purchase_item_id }, message.validation.purchasedProductNotExists)
    await deleteById(Purchase, { id: purchase_item_id, org_id }, message.Purchase.deleted, res)
  }






}
module.exports = new OrganizationPurchaseController();

