const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer')
const fs = require('fs')
mongoose.connect('mongodb://localhost:27017/Resume-Builder').then(() => {
  console.log("connected")
}).catch((err) => {
  console.log(err)
})
const UserSchema = new mongoose.Schema({
  name: { type: String },
  ps: { type: String },
  ph: { type: String },
  email: { type: String }
})
const User = mongoose.model('User', UserSchema)
app.post("/loginUser", async (req, res) => {
  const u_pss = req.body.ps1;
  const u_email = req.body.em_id1;
  try {
    const user = await User.findOne({ email: u_email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found....." });
    }
    if (u_pss === user.ps) {
      return res.json({ message: "User Logged in Successfully" });
    } else {
      return res.status(401).json({ message: "Password Mismatch" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to find User" });
  }
});

app.post("/user-register", async (req, res) => {
  const u_name = req.body.uname;
  const u_pss = req.body.ps;
  const u_ph = req.body.ph;
  const u_email = req.body.em_id;
  try {
    const data1 = await User.findOne({ email: u_email });
    if (data1 == null) {
      const result = await User.create({ name: u_name, ps: u_pss, ph: u_ph, email: u_email });
      res.json({ statusCode: 200, message: "Successfully Registered" })
      //res.render('login');
    }
    else {
      res.json({ message: "User Already Exists" })
    }
  }
  catch (error) {
    res.json({ message: "Registration Failed" })
    console.log(error)
  }
})


const RecruSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  ps: { type: String },
  ph: { type: String },
  company: { type: String }
})

const Recr = mongoose.model('Recruiter', RecruSchema)
app.post("/loginRecru", async (req, res) => {
  const u_pss = req.body.ps2;
  const u_email = req.body.em_id2;
  console.log(u_pss)
  console.log(u_email)
  try {
    const rec = await Recr.findOne({ email: u_email });
    if (!rec) {
      return res.status(404).json({ message: "Recruiter Not Found" });
    }
    if (u_pss === rec.ps) {
      return res.json({ message: "Recruiter Logged in Successfully" });
    } else {
      return res.status(401).json({ message: "Password Mismatch" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to find Recruiter" });
  }
});
/*
const UserSchema1 = new mongoose.Schema({
  name: { type: String },
  pss: { type: String },
  ph: { type: String },
  email: { type: String },
})
const Staff = mongoose.model('Staff', UserSchema1)
app.post("/reg-staff", async (req, res) => {
  const u_name = req.body.uname;
  const u_pss = req.body.ps;
  const u_ph = req.body.ph;
  const u_email = req.body.em_id;
  try {
    const data1 = await Staff.findOne({ email: u_email });
    if (data1 == null) {
      const result = await Staff.create({ name: u_name, pss: u_pss, ph: u_ph, email: u_email });
      res.json({ statusCode: 200, message: "Successfully Registered" })
      //res.render('login');
    }
    else {
      res.json({ message: "User Already Exists" })
    }
  }
  catch (error) {
    res.json({ message: "Registration Failed" })
    console.log(error)
  }
})


app.post("/loginRecru", async (req, res) => {
  const u_pss = req.body.ps;
  const u_email = req.body.em_id;
  try {
    const user = await Staff.findOne({ email: u_email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (u_pss === user.pss) {
      return res.json({ message: "User Logged in Successfully" });
    } else {
      return res.status(401).json({ message: "Password Mismatch" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to find User" });
  }
});
*/
app.listen(4000, () => {
  console.log("Listening at http://localhost:4000")
})

