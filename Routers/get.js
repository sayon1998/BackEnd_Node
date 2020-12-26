const router = require("express").Router();
const studentDetail = require("../Models/student-details");

// Student Details
router.get("/student-details", async (req, res) => {
  const resType = {
    Status: false,
    Data: [],
    Message: "",
  };
  await studentDetail.find({}, async function (err, params) {
    if (err) {
      resType["Message"] = err.message;
      res.status(400).send(resType);
    }
    if (!req.query.currentpage || req.query.currentpage == 0) {
      resType["Message"] = "Current page is Required and it can not be Zero";
      return res.status(400).send(resType);
    }
    if (!req.query.pagelimit || req.query.pagelimit == 0) {
      resType["Message"] = "Page limit is Required and it can not be Zero";
      return res.status(400).send(resType);
    }
    var startIndex = (req.query.currentpage - 1) * req.query.pagelimit;
    const studentData = [];
    for (
      let i = startIndex;
      i <= req.query.pagelimit * req.query.currentpage - 1;
      i++
    ) {
      if (params[i]) {
        studentData.push(params[i]);
      } else {
        break;
      }
    }
    if (params && params.length > 0) {
      resType["Message"] = "Successful";
      resType["Data"] = studentData;
      resType["Count"] = params.length;
      resType["Status"] = true;
      return res.status(200).send(resType);
    } else {
      resType["Status"] = true;
      resType["Message"] = "No Student Details is found";
      return res.status(400).send(resType);
    }
  });
});
module.exports = router;
