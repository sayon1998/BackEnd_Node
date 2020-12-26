const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const port = process.env.PORT || 3000;

// Routes
const allPostRoute = require("./Routers/post");
const allGetRoute = require("./Routers/get");
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
// Router Middleware
app.use("/api/post", allPostRoute);
app.use("/api/get", allGetRoute);

app.listen(port, function () {
  console.log("Server is running on port" + port);
});
