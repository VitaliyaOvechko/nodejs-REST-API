const express = require("express");
// const Joi = require("joi");

// const contacts = require("../../models/contacts");

// const { HttpError } = require("../../helpers");

const controller = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

router.get("/", controller.listContacts);

router.get("/:contactId", controller.getContactById);

router.post("/", validateBody(schemas), controller.addContact);

router.delete("/:contactId", controller.removeContact);

router.put("/:contactId", validateBody(schemas), controller.updateContact);

module.exports = router;
