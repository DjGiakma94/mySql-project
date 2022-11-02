const sendErrorDev = (err, res) => {
  console.log("errorDev1");
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//error handling middleware
module.exports = (err, req, res, next) => {
  //console.log(err.stack) for find all routes errors;
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  sendErrorDev(err, res);
};
