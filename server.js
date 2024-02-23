import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import twilio from "twilio";
import nodemailer from "nodemailer";
import authRoutes from "./routes/authRoutes.js";
import userAccountRoutes from "./routes/userAccountRoutes.js";
import userWalletRoutes from "./routes/userWalletRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import contestRoutes from "./routes/contestRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";

// express app
const app = express();

// dotenv configuration
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Initialize Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Initialize Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Middlewares
app.use(cors());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// Routes Middleware
app.use("/api/auth", authRoutes);
app.use("/api/user", userAccountRoutes);
app.use("/api/wallet", userWalletRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/contest", contestRoutes);
app.use("/api/player", playerRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// MongoDB connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });

// Otp generation
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Send OTP via SMS
app.post("/api/send-sms-otp", (req, res) => {
  const { mobileNumber } = req.body;
  const otp = generateOTP();

  twilioClient.messages
    .create({
      body: `Your OTP for verification at fanverse is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobileNumber,
    })
    .then((message) => {
      console.log("SMS sent", message.sid);
      res.json({ msg: "OTP sent successfully" });
    })
    .catch((error) => {
      console.error("Error sending SMS:", error);
      res.status(500).json({ error: "Failed to send OTP via SMS" });
    });
});

// Send OTP via Email
app.post("/api/send-email-otp", (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Fanverse OTP Verification Code",
    text: `Your OTP for verification is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email", error);
      res.status(500).json({ error: "Failed to send OTP via email" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ msg: "OTP sent successfully" });
    }
  });
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
