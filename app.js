const express = require("express");
const usersRouter = require("./routes/users");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const morgan = require("morgan");

const app = express();

app.use(express.json());

app.use(morgan());

app.use("/users", usersRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
