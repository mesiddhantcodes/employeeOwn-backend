var UserModel = require("../models/User.model");
var bcrypt = require("bcrypt");
var User = require('../models/User.model');
var Project = require('../models/Project.model');
var AuthenticationMiddleware = require('../middleware/Authentication.middleware');
const { sendEmail } = require("../utils/emailVerification.utils");

const AuthController = {
  loginUser: async (req, res) => {
    var { email, password } = req.body;
    let ifUserFounded = await UserModel.findOne({ email: email });
    if (!ifUserFounded) {
      return res.send("User not found");
    }
    if (!ifUserFounded.isEmailVerified) {
      return res.send("Email is not verified");
    }
    let isPasswordMatched = await bcrypt.compare(password, ifUserFounded.password);
    if (!isPasswordMatched) {
      return res.send("Password is not matched");
    } else {
      const token = AuthenticationMiddleware.generateToken(ifUserFounded);
      return res.send({
        status: "success",
        data: ifUserFounded,
        token: token
      });
    }
  },
  registerUser: async (req, res) => {
    var { email, employeeName, phoneNumber, dob, password, userName } = req.body;
    let ifUserFounded = await UserModel.findOne({ email: email });
    if (ifUserFounded) {
      return res.send("User already exist");
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({
      employeeName: employeeName,
      phoneNumber: phoneNumber,
      dob: dob,
      password: hashedPassword,
      userName: userName,
      email: email,
    });
    let dataSaved = await user.save();

    if (dataSaved) {
      const token = AuthenticationMiddleware.generateToken({
        email: email,
      });
      const isMailSent = await sendEmail(email, token);
      if (!isMailSent) {
        return res.send("Email is not sent");
      }

      return res.send("User registered successfully please verify your email");
    } else {
      return res.send("Somthing went wrong user is not registered due to error");
    }
  },
  verifyEmail: async (req, res) => {
    const { token } = req.params;
    let decodedToken = await AuthenticationMiddleware.verifyEmailToken(token);
    if (decodedToken) {
      let ifUserFounded = await UserModel.findOne({ email: decodedToken.email });
      if (ifUserFounded) {
        ifUserFounded.isEmailVerified = true;
        let dataSaved = await ifUserFounded.save();
        if (dataSaved) {
          return res.send("Email is verified successfully");
        } else {
          return res.send("Email is not verified due to some error");
        }
      }
      else {
        return res.send("User not found");
      }
    }
    else {
      return res.send("Invalid token");
    }
  }

}


module.exports = AuthController;