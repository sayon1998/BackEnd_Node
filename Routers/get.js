const router = require("express").Router();
const studentDetail = require("../Models/student-details");

// Student Details
router.get("/student-details/:currentpage/:pagelimit", async (req, res) => {
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
    var startIndex = (req.params.currentpage - 1) * req.params.pagelimit;
    const studentData = [];
    for (
      let i = startIndex;
      i <= req.params.pagelimit * req.params.currentpage - 1;
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
      res.status(200).send(resType);
    } else {
      resType["Status"] = true;
      resType["Message"] = "No Student Details is found";
      res.status(400).send(resType);
    }
  });
});
module.exports = router;
