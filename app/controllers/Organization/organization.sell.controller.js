const createHttpError = require("http-errors");
const message = require("../../messages/message");

const organizationSellValidation = require("../../validators/Organization.sell.validator");
const { findNotExists, findAlreadyExists } = require("../../services/validation.service");
const { create, getAll, getById, updateById, deleteById } = require("../../services/crud.service");
const { Op } = require("sequelize");
const Sell = require("../../model/Organization/Sell");
const Stock = require("../../model/Organization/Stock");


class OrganizationSellController {

  async createSell(req, res) {

    const bodyData = await organizationSellValidation.validateCreateSell(req.body)
    const { org_id } = req.user;


    bodyData.org_id = org_id;


    bodyData.item_name = await bodyData.item_name.toLowerCase()
    let findStockItem = await findNotExists(Stock, {
      item_name: bodyData.item_name,
      // id: bodyData.stock_item_id,
      org_id
    }, "Item not exists")
    // let findStockItem = await Stock.findOne({ where: { org_id, id: bodyData.item_id },raw:true })


    if (parseInt(bodyData.quantity) > parseInt(findStockItem.quantity)) {

      throw createHttpError.NotAcceptable("Quantity is exceeding the Stock quantity limit")

    }

    await Stock.update({ quantity: findStockItem.quantity - bodyData.quantity }, { where: { org_id, item_name: bodyData.item_name } })

    await create(Sell, bodyData, "Sell item added", res)

  }
  async returnSellItem(req, res) {
    let { item_name, sell_id, return_quantity, return_reason } = await organizationSellValidation.validateReturnSell(req.body)
    const { org_id } = req.user;
    item_name = item_name.toLowerCase()
    let findSellItem = await Sell.findOne({ where: { org_id, id: sell_id } ,raw:true})
    
    if (parseInt(return_quantity) > parseInt(findSellItem.quantity)) {

      throw createHttpError.NotAcceptable("Quantity is exceeding the Sell quantity limit")

    }
    let findStockItem = await Stock.findOne({ where: { org_id, item_name: item_name } })
    // console.log(findStockItem,"findStockItem")
    
    await Stock.update({ quantity: parseInt(findStockItem.quantity) + parseInt(return_quantity) }, { where: { org_id, item_name: item_name } }) // The stock will increase bcz quantity is returning 

    await Sell.update({ sell_type: "returned", return_reason, return_quantity,quantity: parseInt(findSellItem.quantity) - parseInt(return_quantity)  }, { where: { id: sell_id } })

    return res.status(200).send({ message: "Item returned successfully" })
  }

  async getAllSell(req, res) {

    const { org_id } = req.user;
    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""
    // let createdAt = req.query?.create-at || ""
    search = search.toLowerCase()


    // await getAll(Sell, { org_id }, message.Sell.getAll, res, page, limit, search, "item_name")
    // Sell.find({})

    search = search.toLowerCase()
    let newPage = 0
    let newLimit = parseInt(limit)

    if (parseInt(page) == 0) newPage = (parseInt(page)) * parseInt(limit)
    else newPage = (parseInt(page) - 1) * parseInt(limit)
    let status = {
      [Op.like]: `%${search || ''}%`,
    }
    // createdAt = {
    //   [Op.like]: `%${createdAt || ''}%`,
    // }


    let data = await Sell.findAll({
      where: {
        org_id, item_name: status,
        // createdAt

        isDeleted: false
      }, offset: newPage, limit: newLimit, order: [['id', 'ASC']], attributes: { exclude: ["isDeleted"] }, raw: true
    })

    return res.status(200).send({ message: message.Sell.getAll, data })

  }

  async getSellById(req, res) {
    let { sell_id } = req.query;
    let { org_id } = req.user;
    await findNotExists(Sell, { org_id, id: sell_id }, "Sell item not exists")
    await getById(Sell, { org_id, id: sell_id }, "Sell item by id", res)

  }

  async updateSellItem(req, res) {
    const bodyData = await organizationSellValidation.validateUpdateSell(req.body)
    const { org_id } = req.user;

    bodyData.sell_item_name = bodyData.sell_item_name.toLowerCase()

    let sellItem = await findNotExists(Sell, { org_id, id: bodyData.sell_item_id ,item_name:bodyData.sell_item_name}, "Sell item not exists")

    let findStockItem = await findNotExists(Stock, {org_id, item_name: bodyData.sell_item_name }, "Item not exists")


    if (bodyData?.update_quantity) { // if quantity exists we will changes the stock quantity according to the given quantity  && quantity should != existing quantity
      // (sellItem.quantity-bodyData.quantity) => to get the diffrence of existing and given quantity

      // if(parseInt(bodyData.quantity)>parseInt(sellItem.quantity)){ // if the given quantity > existing quantity (5>3) subtract from the exsisting data bcz stock is decreasing

      // if((parseInt(findStockItem.quantity)-(bodyData.quantity-sellItem.quantity)) < 0 || parseInt(findStockItem.quantity)+parseInt(sellItem.quantity)<bodyData.quantity){
      //   throw createHttpError.NotAcceptable("The given quantity is exciding its limit")
      // }

      // await Purchase.update({quantity:parseInt(findStockItem.quantity)-(bodyData.quantity-sellItem.quantity)},{where:{

      //   id:bodyData?.item_id,
      //   org_id
      // }})
      //  }

      // else{ 
      //   await Purchase.update({quantity:parseInt(findStockItem.quantity)+(sellItem.quantity-bodyData.quantity)},{where:{

      //     id:bodyData?.item_id,
      //     org_id
      //   }})
      // } 

      let findTheDifference = parseInt( sellItem.quantity - bodyData.update_quantity)
//  console.log((findTheDifference),"     ",parseInt( findStockItem.quantity),"Sfdasdf")
//  console.log((findTheDifference)+parseInt( findStockItem.quantity),"Sfdasdf")
      
      if( (findTheDifference)+parseInt( findStockItem.quantity) <0){
        throw createHttpError.NotAcceptable("Quantity exceeding its limit, check the sell item quantity or you are trying to change more then stock quantity")
      }
      await Sell.update({ quantity:parseInt(bodyData.update_quantity) }, { where: { org_id, id: bodyData.sell_item_id } })
      await Stock.update({quantity:(findTheDifference)+parseInt( findStockItem.quantity)},{where: { org_id, item_name: sellItem.item_name }})
      


    }
    await updateById(Sell, bodyData, message.Sell.updated, res, {  org_id, id: bodyData.sell_item_id })

  }
  async deleteSellItem(req, res) {
    const { sell_id } = req.body;

    const { org_id } = req.user;

    await findNotExists(Sell, {
      id: sell_id,
      org_id
    }, "Sell item not exists")

    await deleteById(Sell, { id: sell_id, org_id }, message.Sell.deleted, res)
  }





}
module.exports = new OrganizationSellController();

