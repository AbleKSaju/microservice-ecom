import { User } from "../model/userModel.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

import { generateToken } from "../../auth-service/authenticationService.js";
import { serviceToProducer } from "../kafka/serviceToProducer.js";

//test
export const fistrequest = async (req, res) => {
  try {
    console.log("Enter");
    res.status(200).json("request sucess");
  } catch (error) {
    res.status(400).json("Error in User-service fisrtrequest " + error);
  }
};

//hashing password
async function hashPassword(password,oldPassword) {
  try {
    const hashedPassword = await bcrypt.hash(password, oldPassword);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

//comapre passowrd
async function comparePasswords(enteredPassword, hashedPassword) {
  try {
    const result = await bcrypt.compare(enteredPassword, hashedPassword);
    return result;
  } catch (error) {
    throw error;
  }
}

//genearte otp
function generateotp() {
  var digits = "1234567890";
  var otp = "";
  for (let i = 0; i < 4; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

//sign up
export const signUpUser = async (req, res) => {
  try {
    console.log("Enter");
    const { name, email, password, mobile } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400).json("This user is already exist please login .....");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    const otp = generateotp();
    console.log(otp);

    const info = await transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Account  ✔",
      text: `Your OTP is : ${otp}`,
      html: `<b>
            <h2 style="color: #3498db;">Verify Your Account</h2>
            <p style="font-size: 16px;">Thank you for creating an account! To complete the verification process, use the following OTP:</p>
            <p style="font-size: 24px; font-weight: bold; color: #2ecc71;">Your OTP is: ${otp}</p>
            <p style="font-size: 14px; margin-top: 20px;">Click the button below to verify your email:</p>
            <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #2ecc71; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 10px;">Verify Email</a>
          </b>
          `,
    });
    console.log("here");
    console.log(info, "inn");
    if (info) {
      console.log("info");
      req.session.userOTP = otp;
      req.session.userData = req.body;

      console.log(otp, "=====this is otp in session");
      console.log("Message sent: %s", info);

      res.status(200).json("Verify your email on your Email");
    } else {
      res.json("email error");
    }
  } catch (error) {
    res.status(400).json("Error in User-service  signUpUser " + error);
  }
};

//verify and save user
export const verifyUser = async (req, res) => {
  try {
    const { otp } = req.body;
    const sessionOtp = req.session.userOTP;
    if (otp == sessionOtp) {
      const { name, email, password, mobile } = req.session.userData;
      const hashpassword = await hashPassword(password);
      const newUser = new User({
        name,
        email,
        password: hashpassword,
        mobile,
      });

      await newUser.save();

      res.status(201).json(newUser);
    } else {
      res.status(400).json("Otp is Wrong");
    }
  } catch (error) {
    res.status(400).json("Error in User-service  verifyUser " + error);
  }
};

//login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (!findUser) {
      res.status(401).json({
        error: "Invalid Credentials",
        message:
          "The provided email address is not associated with any user account. Please check your email or sign up for a new account.",
      });
      return;
    } else {
      const hashPass = await hashPassword(password,findUser.password);
      const isPasswordCorrect = await comparePasswords(password, hashPass);
      if (!isPasswordCorrect) {
        res.status(400).json("Incorrect Password..!");
      } else {
        const token = await generateToken(res, findUser);

        res.status(200).json({
          token,
          user: findUser,
        });
      }
    }
  } catch (error) {
    res.status(400).json("Error in User-service  loginUser  " + error);
  }
};

//edit profile
export const editProdfile = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const user = req.user;

    const emailExist = await User.findOne({ email: { $ne: user.email } });
    const nameExist = await User.findOne({ name: { $ne: user.name } });
    if (emailExist) {
      res.status(400).json("Email is aleary Exist");
    } else if (nameExist) {
      res.status(400).json("Name is aleary Taken");
    } else {
      const userData = await User.findByIdAndUpdate(
        user.id,
        {
          name: name,
          email: email,
          mobile: mobile,
        },
        { new: true }
      );

      if (!userData) {
        res.status(400).json("Invalid credential..!");
      } else {
        res.status(200).json(userData);
      }
    }
  } catch (error) {
    res.status(400).json("Error in User-service  editProdfile  " + error);
  }
};

//adress create
