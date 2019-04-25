const express=require('express');
const app=express();
const path=require('path')
const htmlRouter=express.Router();
htmlRouter.get('/', (req, res) => {
 return res.sendFile(path.join(__dirname, "/index.html"));
});

htmlRouter.get('/signin', (req, res) => {
return res.sendFile(path.join(__dirname, "/signin.html"))
});

htmlRouter.get('/register', (req, res) => {
  return res.sendFile(path.join(__dirname, "/register.html"))
});

htmlRouter.get('/review', (req, res) => {
 return res.sendFile(path.join(__dirname, "/review.html"))
});
module.exports= htmlRouter;
