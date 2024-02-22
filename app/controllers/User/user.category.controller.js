

const message = require("../../messages/message");
const organizartionValidator = require("../../validators/Organization.category.validation")
// const emailConstants = require("../../helpers/AWS")
const createHttpError = require("http-errors");

const Category = require("../../model/Organization/Category");
const SubCategory = require("../../model/Organization/SubCategory");
const {  findNotExists } = require("../../services/validation.service");
const { getAll, getAllWithSingleImageUrl } = require("../../services/crud.service");
const Products = require("../../model/Organization/Product");
const Organization = require("../../model/Organization/Organization");

const { Op } = require("sequelize"); 
class OrganizationCategoryController {
 
  async getAllCategory(req, res) {
    // const org_id = req.query?.org_id;
    const org_id = req.headers?.org_id
    if(!org_id){
        throw createHttpError.NotAcceptable("Organization Id is required")
    }
    await findNotExists(Organization,{org_id},message.validation.organizationNotExist)

    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""

    search = search.toLowerCase()
    let newPage = 0
    let newLimit = parseInt(limit)

    if (parseInt(page) == 0) newPage = (parseInt(page)) * parseInt(limit)
    else newPage = (parseInt(page) - 1) * parseInt(limit)
    let status= {
        [Op.like]: `%${search || ''}%`,
    }

    let data = await Category.findAll({
      where: { org_id,category_name:status,isDeleted: false },
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

    
    data = data.map(item => {
      if (item?.image_url && item?.image_url.length > 0) {
          item.image_url = item.image_url[0];
      }
      return item;
  });

    res.status(200).send({message:"All categories",data})

    // return res.status(200).send({ message: "All categories", data })

  }
  
  async getIsHome(req, res) {
    // const {category_id} = req.body;
    // const org_id = req.query?.org_id;
    const org_id = req.headers?.org_id
    if(!org_id){
        throw createHttpError.NotAcceptable("Organization Id is required")
    }
    await findNotExists(Organization,{org_id},message.validation.organizationNotExist)

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
      let data = await Category.findAll({
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
      
    data = data.map(item => {
      if (item?.image_url && item?.image_url.length > 0) {
          item.image_url = item.image_url[0];
      }
      return item;
  });
     return res.status(200).send({message:"All categories",data})

    } else {
      await getAllWithSingleImageUrl(Category, { org_id }, "All categories", res, page, limit, search, "category_name")

      // throw createHttpError.NotAcceptable("Please send the value of is home")
    }

  }
  async getIsMenu(req, res) {
    // const {category_id} = req.body;
    // const org_id = req.query?.org_id;
    const org_id = req.headers?.org_id
    if(!org_id){
        throw createHttpError.NotAcceptable("Organization Id is required")
    }
    await findNotExists(Organization,{org_id},message.validation.organizationNotExist)

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

      let data = await Category.findAll({
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
      
    data = data.map(item => {
      if (item?.image_url && item?.image_url.length > 0) {
          item.image_url = item.image_url[0];
      }
      return item;
  });
      res.status(200).send({message:"All categories",data})

    } else {
      await getAllWithSingleImageUrl(Category, { org_id }, "All categories", res, page, limit, search, "category_name")

     }
  }

  



}


module.exports = new OrganizationCategoryController();