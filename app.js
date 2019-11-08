const express = require("express");
const bodyParser = require("body-parser");
const payslipRoutes = require("./routes/payslip");
const UserDetailsSchema = require('./schemas/userDetailsSchema'); 
const schemaValidation = require('./middlewares/schemaValidation'); 

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use("/api/payslip", schemaValidation(UserDetailsSchema.details), payslipRoutes);

module.exports = app;