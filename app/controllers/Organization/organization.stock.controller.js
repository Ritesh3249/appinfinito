const createHttpError = require("http-errors");
const message = require("../../messages/message");
// const organizationPurchaseValidation = require("../../validators/Organization.purchase.validator");

const organizationStockValidation = require("../../validators/Organization.stock.validator");
const { findNotExists, findAlreadyExists } = require("../../services/validation.service");
const { create, getAll, getById, updateById, deleteById } = require("../../services/crud.service");
const { Op } = require("sequelize");
const Purchase = require("../../model/Organization/Stock");
const Stock = require("../../model/Organization/Stock");
const { randomAlphaNumaric } = require("../../helpers/KeyGenerator/KeyGen");

 
class OrganizationStockController {

  
  async createStock(req, res) {
 
    const bodyData = await organizationStockValidation.validateCreateStock(req.body)
    const { org_id } = req.user;
     console.log(bodyData)
     
     bodyData.item_name = await bodyData.item_name.toLowerCase()
    await findAlreadyExists(Stock, {
      item_name:bodyData.item_name,
      org_id,
    }, message.validation.stockExists)
    bodyData.org_id = org_id;
    bodyData.product_code = randomAlphaNumaric(6);
    

     await create(Stock, bodyData, message.Stock.created, res)
    
  }
  async updateStock (req,res){
    const bodyData = await organizationStockValidation.validateUpdateStockProduct(req.body)
    const { org_id } = req.user;

    await updateById(Stock, bodyData, message.Stock.updated, res, { org_id, id: bodyData.item_id })

  }

 async getAllStock(req,res){
     
    const { org_id } = req.user;
    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""
    search = search.toLowerCase()

    await getAll(Stock, { org_id }, message.Stock.getAll, res, page, limit, search, "item_name")
 
       
 }
 async getStockById(req,res){
    let {item_id}=req.query;
    let {org_id} = req.user;
    await findNotExists(Stock,{org_id,id:item_id},message.validation.StockNotExists)
    await getById(Stock,{org_id,id:item_id},"Stock by id",res)
     
  }

  async deleteStock(req, res) {
    const { item_id } = req.body;

    const { org_id } = req.user;
    await findNotExists(Stock, {
      id: item_id,
      org_id
    }, message.validation.StockNotExists)

    await deleteById(Purchase, { id: item_id ,org_id}, message.Stock.deleted, res)
  }

}
module.exports = new OrganizationStockController();

