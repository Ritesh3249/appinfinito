const createHttpError = require("http-errors");
const message = require("../../messages/message");
const Products = require("../../model/Organization/Product");

const organizationProductValidation = require("../../validators/Organization.products.validator");
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
class OrganizationProductsController {

  async createProduct(req, res) {

    // const { product_name, image_url, sub_category_id, price, discounted_price, description } = await organizationProductValidation.validateProduct(req.body)
    const bodyData = await organizationProductValidation.validateProduct(req.body)
    const { org_id } = req.user;
    const { product_name, sub_category_id, price, discounted_price } = bodyData;
    bodyData.percentage_discounted_price = calculatePercentageDiscount(price, discounted_price).toFixed(2)

    // if the discounted_price is undefined of empty or 0 this condition will set the value if percentage 0

    if (!discounted_price || discounted_price == '' || discounted_price == '0') {
      bodyData.percentage_discounted_price = '0'
    }
    bodyData.org_id = org_id;
    // const existingProducts = await Products.findOne({
    //   where: {
    //     product_name,
    //     org_id,
    //     sub_category_id,
    //     isDeleted: false
    //   },
    //   raw: true
    // });

    // if (existingProducts) {
    //   throw createHttpError.NotAcceptable(message.validation.productExists)
    // }
    await findAlreadyExists(Products, {
      product_name,
      org_id,
      sub_category_id
    }, message.validation.productExists)

    let findTheCategory = await findNotExists(SubCategory, {
      id: sub_category_id,
      org_id,
      isDeleted: false
    }, message.validation.subCategoryNotExists)

    // let findTheCategory = await SubCategory.findOne({ where: { id: sub_category_id } })
    bodyData.category_id = findTheCategory.category_id
    await create(Products, bodyData, message.Product.created, res)
    // await Products.create({
    //   product_name, image_url, sub_category_id, org_id, price, discounted_price, percentage_discounted_price, description
    // })


    // return res.status(200).send({ message: message.Product.created });

  }
  async getAllProduct(req, res) {
    // const {sub_category_id} = req.body;
    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""
    search = search.toLowerCase()

    const sub_category_id = req.query?.sub_category_id;
    const category_id = req.query?.category_id;
    const { org_id } = req.user;



    // let data = await Products.findAll({ where: { sub_category_id, org_id, isDeleted: false }, offset: newPage, limit: newLimit, order: [['id', 'ASC']], attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] }, raw: true })
    if (sub_category_id) {
      await getAll(Products, { sub_category_id, org_id }, "All products", res, page, limit, search, "product_name")

    } else if (category_id) {

      // await getAll(Products,{  org_id },"All products",res,page,limit,search,"product_name")
      await getAll(Products, { category_id, org_id }, "All products", res, page, limit, search, "product_name")

    } else {
      await getAll(Products, { org_id }, "All products", res, page, limit, search, "product_name")

    }

    // return res.status(200).send({ message: "All Products", data })

  }
  async getProductById(req, res) {
    let { product_id } = req.query || '0';
    let { org_id } = req.user;

    await findNotExists(Products, {
      id: product_id,
      org_id,
      isDeleted: false
    }, message.validation.productNotExists)

    // await getById(Products,{ org_id, id: product_id},"Product by id",res)


    let data = await Products.findOne({
      where: { org_id, id: product_id, isDeleted: false },

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


    return res.status(200).send({ message: "Product by id", data })


  }

  async updateProduct(req, res) {
    const bodyData = await organizationProductValidation.validateUpdateProduct(req.body)
    const { org_id } = req.user;
    // await findNotExists(Products,{ org_id, id: bodyData.product_id},message.validation.productNotExists)

    // let productDetails = await Products.findOne({ where: { org_id, id: bodyData.product_id, isDeleted: false }, raw: true })
    let productDetails = await findNotExists(Products, { org_id, id: bodyData.product_id }, message.validation.productNotExists)
    // console.log(productDetails,"asdf")
    if (bodyData?.price && bodyData?.discounted_price) {

      bodyData.percentage_discounted_price = calculatePercentageDiscount(bodyData?.price, bodyData?.discounted_price)

    }
    if (bodyData?.price) {

      bodyData.percentage_discounted_price = calculatePercentageDiscount(bodyData?.price, productDetails?.discounted_price)

    }

    if (bodyData?.discounted_price) {

      bodyData.percentage_discounted_price = calculatePercentageDiscount(productDetails?.price, bodyData?.discounted_price)

    }

    await updateById(Products, bodyData, message.Product.updated, res, { org_id, id: bodyData.product_id })



    // await Products.update(bodyData, { where: { org_id, id: bodyData.product_id, isDeleted: false } })

    // return res.status(200).send({ message: message.Product.updated })

  }
  async deleteProduct(req, res) {
    const { product_id } = req.body;

    const { org_id } = req.user;

    await findNotExists(Products, {
      id: product_id,
      org_id
    }, message.validation.productNotExists)

    // const findUser = await Products.findOne({ where: { org_id, id: product_id, isDeleted: false } })
    // if (!findUser) {
    //   throw createHttpError.NotAcceptable(message.validation.productNotExists)
    // }

    // await Products.update({ isDeleted: true }, { where: { id: product_id } })
    // return res.status(200).send({ message: message.Product.deleted })

    await deleteById(Products, { id: product_id }, message.Product.deleted, res)
  }


}
module.exports = new OrganizationProductsController();

