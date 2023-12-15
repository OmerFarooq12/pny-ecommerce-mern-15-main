const express = require("express");
const router = express.Router();
const joi = require("joi");
const nodemailer = require("nodemailer");

//nodemailer configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "leofurqan12@gmail.com",
    pass: "gvfi qsci boaz bumj",
  },
});

//models
const User = require("../models/User");

//validations
const userValidator = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const verificationValidator = joi.object({
  email: joi.string().email().required(),
  code: joi.number().required().min(6)
})

router.post("/register", async (req, res) => {
  try {
    await userValidator.validateAsync(req.body);

    const checkExist = await User.findOne({ email: req.body.email });

    if (checkExist) {
      return res
        .status(200)
        .send({ status: "400", message: "User email already exists" });
    } else {
      const user = new User(req.body);
      user.otp = Math.floor(100000 + Math.random() * 900000)
      user.save();

      await transporter.sendMail({
        from: "Leo Furqan",
        to: user.email,
        subject: "Account Verification",
        html: `<h2>Account Verification</h2><p>Your OTP for account verification is <b>${user.otp}</b></p>`
      })

      return res
        .status(200)
        .send({ status: "200", message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(200).send({ status: "400", message: error.details[0].message });
  }
});

router.post('/verification', async (req, res) => {
  try {
    await verificationValidator.validateAsync(req.body);

    const user = await User.findOne({email: req.body.email, otp: req.body.code})
    if(user) {
      user.isActive = true
      user.save()

      res.status(200).send({status: "200", message: "Verification Successfull..."})
    } else {
      res.status(200).send({status: "400", message: "Invalid Code"})
    }
  } catch(error) {
    res.status(200).send({ status: "400", message: error.details[0].message });
  }
})

module.exports = router;
