/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const {  MONGO_URL, DB_NAME } = process.env;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./Routes/Auth-Route");
const PORT = 4000;
const app = express();

mongoose.connect(MONGO_URL, {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => console.log("MongoDB is connected successfully"))
.catch((err) => console.error(err));

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
  app.use(cookieParser());
  
  app.use(express.json());
  
  app.use("/", authRoute);