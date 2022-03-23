const path = require('path');
const http = require('http');
require('dotenv').config()
const redis = require('redis');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const api_key =require('./config/config');
const authRoutes = require('./routes/auth');
const teacherRoutes=require('./routes/teacher')
const homeRoutes= require('./routes/homepage')
const courseRoutes=require('./routes/coursepage')
// const {addRoom,getUser} = require('./chat');
const MONGODB_URI =api_key.mongo;
const app = express();
const server = http.createServer(app);
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));
app.use('/videos',express.static(path.join(__dirname, 'videos')));
app.use((req, res, next) =>{  // To remove CROS (cross-resource-origin-platform) problem 
  res.setHeader('Access-Control-Allow-Origin',"*"); // to allow all client we use *
  res.setHeader('Access-Control-Allow-Methods',"OPTIONS,GET,POST,PUT,PATCH,DELETE"); //these are the allowed methods 
  res.setHeader('Access-Control-Allow-Headers', "*"); // allowed headers (Auth for extra data related to authoriaztiom)
  next();
})
app.use(authRoutes);
app.use(teacherRoutes);
app.use(homeRoutes);
app.use(courseRoutes);
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(MONGODB_URI,{ useUnifiedTopology: true,useNewUrlParser: true })
    .then(()=> {
          server.listen(8080);
          console.log("Server Started!")
      })
    .catch(err => {
      console.log(err);
    });
}
module.exports = app;