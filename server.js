const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const port = process.env.PORT || 3000;

// Routes
const allPostRoute = require("./Routers/post");
const allGetRoute = require("./Routers/get");
const allPutRoute = require("./Routers/put");
const allDeleteRoute = require("./Routers/delete");
const imageUploadRoute = require("./Routers/image-upload");
//Environment Setup
dotEnv.config();

// Connect Mongoose
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected to MongoDB")
);

// Middleware
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});
// Router Middleware
app.use("/api", allPostRoute);
app.use("/api", allGetRoute);
app.use("/api", allPutRoute);
app.use("/api", allDeleteRoute);
app.use("/api", imageUploadRoute);

app.listen(port, function () {
  console.log("Server is running on port" + port);
});
