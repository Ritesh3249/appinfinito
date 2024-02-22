
const { putObjectUrl } = require("../../helpers/AWS/aws-s3");
const Purchase = require("../../model/Organization/Purchase");
const Sell = require("../../model/Organization/Sell");
const WorkingDays = require("../../model/Organization/WorkingDays");
const { calculatePercentageDiscount } = require("../../services/common.service");
const sequelize = require("../../startup/db");

const Slot = require("../../model/Organization/Slot");
const { Sequelize } = require("sequelize");


class CommonController {

  async getDiscountedPrice(req, res) {

    let { price, discounted_price } = req.query;
    let data = calculatePercentageDiscount(price, (discounted_price || '0'))
    res.status(200).send({ message: "Percentage of discount", data: data.toFixed(2) })
  }
  async uploadImage(req, res) {
    const { type, folder_name } = req.body;

    const imageName = `image-${Date.now()}`

    const data = await putObjectUrl(type, folder_name, imageName);
    res.status(200).send({ message: "Upload image url", data, image_name: `uploads/${folder_name}/${imageName}` })

  }

  async getAllCount(req, res) {
    let { org_id } = req.user;
    let count_of_sell_item;
    let count_of_return_item;
    let count_of_total_stock;
    let count_of_total_purchase;
    let amount_purchased_stock;
    let results = await Sell.findAll({
      attributes: [
        [sequelize.fn('sum', sequelize.cast(sequelize.col('quantity'), 'INTEGER')), 'TotalQuantity'],
        [sequelize.fn('sum', sequelize.cast(sequelize.col('return_quantity'), 'INTEGER')), 'TotalReturnQuantity'],
      ],
      where: { org_id }
    })
    let product = await Purchase.findAll({
      attributes: [
        [sequelize.fn('sum', sequelize.cast(sequelize.col('quantity'), 'INTEGER')), 'TotalQuantity'],
        [sequelize.fn('sum', sequelize.cast(sequelize.col('price'), 'INTEGER')), 'TotalPrice'],
      ],
      where: { org_id }
    })

    console.log(results, "asdfasdfasaaaaaa", product)

    count_of_sell_item = parseInt(results[0].dataValues.TotalQuantity)
    count_of_return_item = parseInt(results[0].dataValues.TotalReturnQuantity)
    count_of_total_purchase = (parseInt(results[0].dataValues.TotalQuantity) + parseInt(results[0].dataValues.TotalReturnQuantity)) + parseInt(product[0].dataValues.TotalQuantity)
    count_of_total_stock = parseInt(product[0].dataValues.TotalQuantity)
    amount_purchased_stock = parseInt(product[0].dataValues.TotalPrice)




    res.status(200).send({ message: "All count", data: { count_of_sell_item, count_of_return_item, count_of_total_stock, count_of_total_purchase, amount_purchased_stock } })
  }
  async createWorkingDays(org_id) {
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    for (let index = 0; index < days.length; index++) {
      await WorkingDays.create({ day: days[index], org_id })

    }
    console.log("Working days created")

  }

  async getSlotFromTodaysDateByService(req, res) {
    const { service_name } = req.query
    const today = new Date().toISOString().split('T')[0];
    console.log(today, "Asdfasdf")
    const org_id = req.headers?.org_id

    // data from today
    const slotsStartingFromToday = await Slot.findAll({
      where: {
        slotDate: {
          [Sequelize.Op.gte]: today,
        },
        org_id,
        service: service_name
      },
    });



    res.status(200).send({ message: "Slots from today", data: slotsStartingFromToday });

  }
  async getAllSlots(req, res) {
    const today = new Date().toISOString().split('T')[0];
    const org_id = req.headers?.org_id

    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"

    let newPage = 0
    let newLimit = parseInt(limit)

    if (parseInt(page) == 0) newPage = (parseInt(page)) * parseInt(limit)
    else newPage = (parseInt(page) - 1) * parseInt(limit)

    // data from today
    const slotsStartingFromToday = await Slot.findAll({
      where: {
        slotDate: {
          [Sequelize.Op.gte]: today,
        },
        org_id,
        isDeleted: true,

      },
      offset: newPage, limit: newLimit, order: [['id', 'ASC']], attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] }, raw: true
    });

    res.status(200).send({ message: "Slots from today", data: slotsStartingFromToday });
  }
}


module.exports = new CommonController();