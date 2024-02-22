

const message = require("../../messages/message");
const organizartionValidator = require("../../validators/Organization.category.validation")
// const emailConstants = require("../../helpers/AWS")
const createHttpError = require("http-errors");

const Category = require("../../model/Organization/Category");
const SubCategory = require("../../model/Organization/SubCategory");
const { findAlreadyExists, findNotExists } = require("../../services/validation.service");
const { create, getAll, getById, updateById, deleteById } = require("../../services/crud.service");
const Products = require("../../model/Organization/Product");
const { Op } = require("sequelize");
const Services = require("../../model/Organization/Service");


class OrganizationCategoryController {


  async createCategory(req, res) {
    // let { category_name, image_url, isProduct } = await organizartionValidator.validateCategory(req.body)
    let bodyData = await organizartionValidator.validateCategory(req.body)
    const { org_id } = req.user;
    bodyData.org_id = org_id
    // console.log(org_id,"sadfasdfas")
    //  category_name = category_name.toLowerCase().trim()

    await findAlreadyExists(Category, { category_name: bodyData.category_name }, message.validation.categoryAlreadyExists)

    // const existingCategory = await Category.findOne({
    //   where: {
    //     category_name,
    //     isDeleted: false
    //   },
    //   raw: true
    // });

    // if (existingCategory) {
    //   throw createHttpError.NotAcceptable(message.validation.categoryAlreadyExists)
    // }
    await create(Category, bodyData, message.Category.created, res)
    // await Category.create({
    //   // category_name, image_url, org_id, isProduct
    //   category_name, image_url, org_id
    // })


    // return res.status(200).send({ message: message.Category.created });

  }
  async getAllCategory(req, res) {
    // const {category_id} = req.body;
    const { org_id } = req.user;
    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""

    search = search.toLowerCase()

    // let newPage = 0
    // if (parseInt(page) == 0) newPage = (parseInt(page)) * parseInt(limit)
    // else newPage = (parseInt(page) - 1) * parseInt(limit)
    // let newLimit = parseInt(limit)

    // let data = await Category.findAll({where: { org_id,isDeleted:false },
    //   attributes: ['id', 'category_name','image_url','isProduct'],
    //   include: [
    //     {
    //       model: SubCategory,
    //       attributes: ['id', 'sub_category_name', 'image_url'],
    //       where: { org_id,isDeleted:false },
    //       required: false, // Use required: false to perform a LEFT JOIN
    //     },
    //   ],})

    // let data = await Category.findAll({
    //   where: { org_id, isDeleted: false },
    //   attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] }
    //   , offset: newPage, limit: newLimit, order: [['id', 'ASC']], raw: true
    // })

    await getAll(Category, { org_id }, "All categories", res, page, limit, search, "category_name")

    // return res.status(200).send({ message: "All categories", data })

  }
  async getIsHome(req, res) {
    // const {category_id} = req.body;
    const { org_id } = req.user;
    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""
    let isHome = req.query?.is_home
    search = search.toLowerCase()
    let newPage = 0
    let newLimit = parseInt(limit)

    if (parseInt(page) == 0) newPage = (parseInt(page)) * parseInt(limit)
    else newPage = (parseInt(page) - 1) * parseInt(limit)
    let status= {
        [Op.like]: `%${search || ''}%`,
    }



 
    if (isHome) {

      // await getAll(Category, { org_id, isHome }, "All categories by is home", res, page, limit, search, "category_name")
      const data = await Category.findAll({
        where: { org_id,isHome,category_name:status,isDeleted: false },
        attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] },
        include: [
          {
            model: SubCategory,
            attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] },
            where: { org_id, isDeleted: false },
            required: false, // Use required: false to perform a LEFT JOIN
            include: [
              {
                model: Products,
                attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] },
                where: { org_id, isDeleted: false },
                required: false, // Use required: false to perform a LEFT JOIN
              },
            ],
          },
        ],
        offset: newPage, limit: newLimit
      });
     return res.status(200).send({message:"All categories",data})

    } else {
      await getAll(Category, { org_id }, "All categories", res, page, limit, search, "category_name")

      // throw createHttpError.NotAcceptable("Please send the value of is home")
    }

  }
  async getIsMenu(req, res) {
    // const {category_id} = req.body;
    const { org_id } = req.user;
    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""
    let isMenu = req.query?.is_menu

    search = search.toLowerCase()
    let newPage = 0
    let newLimit = parseInt(limit)

    if (parseInt(page) == 0) newPage = (parseInt(page)) * parseInt(limit)
    else newPage = (parseInt(page) - 1) * parseInt(limit)
    let status= {
        [Op.like]: `%${search || ''}%`,
    }

    if (isMenu) {

      const data = await Category.findAll({
        where: { org_id,isMenu,category_name:status,isDeleted: false },
        attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] },
        include: [
          {
            model: SubCategory,
            attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] },
            where: { org_id, isDeleted: false },
            required: false, // for left join
            include: [
              {
                model: Products,
                attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] },
                where: { org_id, isDeleted: false },
                required: false,  
              },
            ],
          },
        ],
        offset: newPage, limit: newLimit
      });
      res.status(200).send({message:"All categories",data})

    } else {
      await getAll(Category, { org_id }, "All categories", res, page, limit, search, "category_name")

     }
  }
  async getCategoryById(req, res) {
    let { category_id } = req.query;
    let { org_id } = req.user;


    await findNotExists(Category, { org_id, id: category_id }, message.validation.categoryNotExists)
    await getById(Category, { org_id, id: category_id }, "Category by id", res)

  }

  async updateCategory(req, res) {
    const bodyData = await organizartionValidator.validateUpdatedCategory(req.body)
    const { org_id } = req.user;

    await findNotExists(Category, { org_id, id: bodyData.category_id }, message.validation.categoryNotExists)
    await updateById(Category, bodyData, message.Category.updated, res, { org_id, id: bodyData.category_id })
    
  }
  async deleteCategory(req, res) {
    const { category_id } = req.body;
    const { org_id } = req.user;

    await findNotExists(Category, { org_id, id: category_id }, message.validation.categoryNotExists)
    await deleteById(Category, { id: category_id }, message.Category.deleted, res)
  
  }

  // Sub category 
  async createSubCategory(req, res) {
    const { sub_category_name, image_url, category_id } = await organizartionValidator.validateSubCategory(req.body)
    const { org_id } = req.user;
 
    await findAlreadyExists(SubCategory, { org_id, sub_category_name, category_id }, message.validation.subCategoryAlreadyExists)
    await create(SubCategory, { sub_category_name, image_url, category_id, org_id }, message.SubCategory.created, res)
    
  }
  async getAllSubCategoryByCategory(req, res) {
     
    const { category_id } = req.query
    const { org_id } = req.user;
    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""
    
    if(category_id){
      await getAll(SubCategory, { org_id, category_id }, "All Sub-categories by category", res, page, limit, search, "sub_category_name")
    }else{
      await getAll(SubCategory, { org_id }, "All Sub-categories by category", res, page, limit, search, "sub_category_name")
    }
       
  }
  async getSubCategoryById(req, res) {
    let { sub_category_id } = req.query;
    let { org_id } = req.user;

    await findNotExists(SubCategory, { org_id, id: sub_category_id }, message.validation.subCategoryNotExists)

    // await getById(SubCategory, { id: sub_category_id }, "Sub Category by id", res)
    let data = await SubCategory.findOne({
      where: {org_id, id: sub_category_id, isDeleted: false },

      include: [
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
    
    

    return res.status(200).send({ message: "Sub Category by id", data })

  }

  async updateSubCategory(req, res) {
    const bodyData = await organizartionValidator.validateUpdatedSubCategory(req.body)
    const { org_id } = req.user;
 
    await findNotExists(SubCategory, { org_id, id: bodyData.sub_category_id }, message.validation.subCategoryNotExists)
    await findNotExists(Category, { org_id, id: bodyData.category_id }, message.validation.categoryNotExists)
    const findProduct = await Products.findOne({where:{sub_category_id:bodyData.sub_category_id}})
    const findService = await Services.findOne({where:{sub_category_id:bodyData.sub_category_id}})
    if(findProduct){
      await Products.update({category_id:bodyData.category_id},{where:{sub_category_id:bodyData.sub_category_id}})
    }

    if(findService){
      await Services.update({category_id:bodyData.category_id},{where:{sub_category_id:bodyData.sub_category_id}})
    }
    await updateById(SubCategory, bodyData, message.SubCategory.updated, res, { id: bodyData.sub_category_id })
    
   

    
  }
  async deleteSubCategory(req, res) {
    const { sub_category_id } = req.body;
    const { org_id } = req.user;

    await findNotExists(SubCategory, { org_id, id: sub_category_id }, message.validation.subCategoryNotExists)
    await deleteById(SubCategory, { id: sub_category_id }, message.SubCategory.deleted, res)
   
  }



}


module.exports = new OrganizationCategoryController();