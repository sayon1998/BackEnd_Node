const router = require("express").Router();
const studentDetail = require("../Models/student-details");
const validation = require("../Service/validation");
// Student Details Insert
router.post("/student-details", async (req, res) => {
  const resType = {
    Status: false,
    Data: [],
    Message: "",
  };
  if (JSON.stringify(req.body) != "{}") {
    if (req.body.stdname == "") {
      resType["Message"] = "Student's Name is Required";
      return res.status(400).send(resType);
    } else if (req.body.stdroll == "") {
      resType["Message"] = "Student's Roll is Required";
      return res.status(400).send(resType);
    } else if (req.body.stdphno == null) {
      resType["Message"] = "Student's Phone Number is Required";
      return res.status(400).send(resType);
    } else if (req.body.stdpin == null) {
      resType["Message"] = "Pin Code is Required";
      return res.status(400).send(resType);
    } else if (req.body.stdcourse == "") {
      resType["Message"] = "Course is Required";
      return res.status(400).send(resType);
    } else if (req.body.stdstream == "") {
      resType["Message"] = "Stream is Required";
      return res.status(400).send(resType);
    } else if (req.body.stdcollege == "") {
      resType["Message"] = "College is Required";
      return res.status(400).send(resType);
    } else {
      if (JSON.stringify(req.body.stdphno).length > 10) {
        resType["Message"] = "Phone Number can not be exceed 10 digit";
        return res.status(400).send(resType);
      } else if (JSON.stringify(req.body.stdpin).length > 6) {
        resType["Message"] = "PIN code can not be exceed 6 digit";
        return res.status(400).send(resType);
      } else {
        if (validation(req.body.stdemail)) {
          const studentData = new studentDetail({
            std_name: req.body.stdname,
            std_roll: req.body.stdroll,
            std_regno: req.body.stdregno,
            std_email: req.body.stdemail,
            std_address: req.body.stdaddress,
            std_phno: req.body.stdphno,
            std_pin: req.body.stdpin,
            std_course: req.body.stdcourse,
            std_stream: req.body.stdstream,
            std_college: req.body.stdcollege,
          });
          try {
            resType["Data"] = [await studentData.save()];
            resType["Status"] = true;
            resType["Message"] = "Student Details is Inserted Successfully";
            return res.status(200).send(resType);
          } catch (err) {
            resType["Message"] = err.message;
            return res.status(400).send(resType);
          }
        }
        resType["Message"] = "Email is not Valid";
        return res.status(400).send(resType);
      }
    }
  }
  resType["Message"] = "Please Insert Details";
  return res.status(400).send(resType);
});

module.exports = router;
