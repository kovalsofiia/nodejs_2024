const createError = require("http-errors");

async function authenticationCheck(req, res, next) {
  if (req.headers["x-auth"] !== "3012") {
    return next(
      createError.Unauthorized(
        "Your access token is invalid or missing. Check it, if you want to access the db."
      )
    );
  }

  next();
}

module.exports = {
  authenticationCheck,
};
