const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string()
    .messages({
      "any.required": `missing required password field`,
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      "any.required": `missing required email field`,
    })
    .required(),
  subscription: Joi.string()
    .messages({
      "any.required": `missing required subscription field`,
    })
    .required(),
});

const loginSchema = Joi.object({
  password: Joi.string()
    .messages({
      "any.required": `missing required password field`,
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      "any.required": `missing required email field`,
    })
    .required(),
  subscription: Joi.string()
    .messages({
      "any.required": `missing required subscription field`,
    })
    .required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
