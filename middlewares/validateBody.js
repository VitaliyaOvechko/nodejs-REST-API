const { HttpError } = require("../helpers");
const { schemas } = require("../models/contact");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      if (schema === schemas.updateFavoriteSchema)
        throw HttpError(400, "missing fields favorite");
      throw HttpError(400, "missing fields");
    }
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
