const message = require("../../messages/message");
const SuperAdmin = require("../../model/SuperAdmin/SuperAdmin");
const organizartionValidator = require("../../validators/Organization.auth.validator")
const { sendEmail } = require("../../helpers/AWS/sendMail")
// const emailConstants = require("../../helpers/AWS")
const createHttpError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const organizationCreatePassword = require("../../helpers/EmailTemplates/createPassword")
const Organization = require("../../model/Organization/Organization");
const { SECRET_ACCESS_KEY } = process.env;
const { uid } = require('uid');
const sequelize = require("../../startup/db");
const { getAll, getById, updateById, deleteById } = require("../../services/crud.service");
const { findNotExists } = require("../../services/validation.service");


class OrganizationUserController {

  


  async getAllOrganization(req, res) {
    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""
    search = search.toLowerCase()

    await getAll(Organization,{isDeleted:false},message.Organization.get,res,page,limit,search,"legal_name")
//     let newPage = 0
//     if (parseInt(page) == 0) newPage = (parseInt(page)) * parseInt(limit)
//     else newPage = (parseInt(page) - 1) * parseInt(limit)
//     let newLimit = parseInt(limit)

// let newData = await Organization.findAll({where:{},raw:true})
 
    // let data = await Organization.findAll({ where: { isDeleted: false }, offset: newPage, limit: newLimit, order: [['id', 'ASC']], attributes: { exclude: ['pan_id', 'state', 'city', 'gstin', 'website_url', 'password', 'createdAt', 'updatedAt', 'isDeleted'] },raw:true })

    // return res.status(200).send({ message: message.Organization.get, data })

  }

  async getOrganizationById(req, res) {
    let { org_id } = req.query;

    await findNotExists(Organization,{org_id,isDeleted:false},message.validation.organizationNotExist)

    await getById(Organization,{org_id},"Organization by id",res)
    // let data = await Organization.findOne({ where: { org_id, isDeleted: false }, attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'isDeleted'] }, raw: true })
    // if (!data) {
    //   throw createHttpError.NotAcceptable(message.validation.organizationNotExist)
    // }
    // return res.status(200).send({ message: "Organization by id", data })

  }

  async updateOrganization(req, res) {
    const bodyData = await organizartionValidator.validateUpdateOrganization(req.body)

    await findNotExists(Organization,{org_id:bodyData.org_id,isDeleted:false},message.validation.organizationNotExist)
    await updateById(Organization,bodyData,message.Organization.updated,res,{org_id:bodyData.org_id})
    // const findOrg = await Organization.findOne({ where: { org_id: bodyData.org_id, isDeleted: false } })
    // if (!findOrg) {
    //   throw createHttpError.NotAcceptable(message.validation.organizationNotExist)
    // }

    // await Organization.update(bodyData, { where: { org_id: bodyData.org_id } })
    // return res.status(200).send({ message: message.Organization.updated })
  }

  async deleteOrganization(req, res) {
    const { data } = await organizartionValidator.validateString(req.body.org_id)
    await findNotExists(Organization,{org_id: data,isDeleted:false},message.validation.organizationNotExist)

    await deleteById(Organization,{org_id: data},message.Organization.deleted,res)
    // let findOrg = await Organization.findOne({ where: { org_id: data, isDeleted: false } })

    // if (!findOrg) {
    //   throw createHttpError.NotAcceptable(message.validation.organizationNotExist)
    // }

    // await Organization.update({ isDeleted: true }, { where: { org_id: data } })

    // return res.status(200).send({ message: message.Organization.deleted })
  }
}


module.exports = new OrganizationUserController();