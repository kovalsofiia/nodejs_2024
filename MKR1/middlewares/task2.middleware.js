const createError = require("http-errors");

async function validateParamsForOperation(req, res, next) {
  try {
    const { a, n } = req.body;

    if (!a || !n) {
      throw createError.BadRequest("a&n must be provided");
    }

    if (typeof a !== "number" || typeof n !== "number") {
      throw createError.BadRequest("a&n must be numbers");
    }

    if (n <= 0) {
      throw createError.BadRequest("n must be positive,natural number");
    }
    //ОБЧИСЛЕННЯ РЕЗУЛЬТАТУ ВИРАЗУ І ДОДАВАННЯ ЙОГО У BODY.
    let sum = 0;
    let term = 1 / a;
    let factorial = 1;

    for (let i = 1; i <= n; i++) {
      factorial *= i;
      sum += term;
      term /= a + i;
    }

    req.body.answer = sum;

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateParamsForOperation,
};
