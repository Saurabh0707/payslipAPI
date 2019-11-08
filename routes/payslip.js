const express = require("express");
const calculatePayslip = require("../controllers/payslip");
let router = express.Router();

router.get("", async (req, res) => {
    try{
      let response = await calculatePayslip(req.body);
      res.status(200).json({
        "message": "Success",
        "details": response
      });
    }catch(err){
      res.status(500).json({
        "message": "Error",
        "details": `Internal Server Error ${err}`
      });
    }
  });

module.exports = router;