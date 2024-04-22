const Joi = require("joi");
const currentYear = new Date().getFullYear();

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

const StudentCreateSchema = Joi.object({
  firstName: Joi.string().min(2).max(60),
  lastName: Joi.string().min(2).max(60),
  birthDate: Joi.date().max(`${currentYear}-12-31`).iso(),
  group: Joi.string()
    .regex(/^group\d+$/)
    .min(2)
    .max(60),
  faculty: Joi.string().min(2).max(60),
  averageGrade: Joi.number().min(0).max(5),
  workplace: Joi.string().min(2).max(60),
  city: Joi.string().min(2).max(60),
  email: Joi.string().min(2).max(60),
  password: Joi.string().required().min(6).max(10),
  reminderWater: Joi.string(),
})
  .custom((value, helpers) => {
    const birthDate = new Date(value.birthDate);
    const yearOfBirth = birthDate.getFullYear();
    const monthOfBirth = birthDate.getMonth() + 1;
    const dayOfBirth = birthDate.getDate();

    if (monthOfBirth === 2 && dayOfBirth === 29 && !isLeapYear(yearOfBirth)) {
      return helpers.error("any.invalid");
    }
    return value;
  })
  .messages({
    "any.invalid": "Date of birth is forbidden.",
  });

module.exports = {
  StudentCreateSchema,
};
