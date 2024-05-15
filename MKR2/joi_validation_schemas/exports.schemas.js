const Joi = require("joi");

const ExportCreateSchema = Joi.object({
  code: Joi.number().min(0).max(5),
  itemName: Joi.string().min(2).max(60),
  itemCountryExport: Joi.string().min(2).max(60),
  itemAmount: Joi.number().min(0).max(100000000), //100 mil
  itemPrice: Joi.number().min(0).max(100000000), //100 mil
});

module.exports = {
  ExportCreateSchema,
};
