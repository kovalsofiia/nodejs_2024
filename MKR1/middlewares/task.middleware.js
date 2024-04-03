const createError = require("http-errors");

async function validateParamsForTriangle(req, res, next) {
  try {
    const { side1, side2, side3 } = req.body;

    if (!side1 || !side2 || !side3) {
      throw createError.BadRequest("All sides must be provided");
    }

    if (
      typeof side1 !== "number" ||
      typeof side2 !== "number" ||
      typeof side3 !== "number"
    ) {
      throw createError.BadRequest("All sides must be numbers");
    }

    if (side1 <= 0 || side2 <= 0 || side3 <= 0) {
      throw createError.BadRequest("All sides must be positive numbers");
    }
    //ОБЧИСЛЕННЯ ПЛОЩІ ТРИКУТНИКА ТА ДОДАВАННЯ ЇЇ У BODY.
    const s = (side1 + side2 + side3) / 2;
    const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    req.body.area = area;

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateParamsForTriangle,
};
