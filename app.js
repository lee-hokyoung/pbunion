const createError = require("http-errors");
const compression = require("compression");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
require("dotenv").config();

const passport = require("passport");
const passportConfig = require("./passport");
const app = express();

const indexRouter = require("./router/index");
const adminRouter = require("./router/admin");

passportConfig(passport);

const connect = require("./model");
connect();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("port", process.env.PORT || 8001);

app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "public"), { maxAge: "" }));
app.use(
  "/paper-kit",
  express.static(path.join(__dirname, "public/paper-kit"), { maxAge: "1m" })
);
app.use(
  "/cache_img",
  express.static(path.join(__dirname, "cache_img"), { maxAge: "1m" })
);
app.use(
  "/nm",
  express.static(path.join(__dirname, "node_modules"), { maxAge: "1m" })
);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 대기 중`);
});
