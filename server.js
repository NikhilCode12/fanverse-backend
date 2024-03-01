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
import Match from "./models/Match.js";
import contestRoutes from "./routes/contestRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// express app
const app = express();
const token = process.env.ENTITYSPORTS_API_TOKEN;

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
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Middlewares
app.use(cors());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// Routes Middleware
app.use("/api/payments", paymentRoutes);
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

// matches route to get matches list from Entity sporst and then cache it in our db matches
app.get("/api/matches/all", async (req, res) => {
  try {
    const cachedMatches = await Match.find();

    if (cachedMatches.length > 0) {
      return res.json(cachedMatches);
    }

    // Fetch data from entity sports api
    const response = await fetch(
      `https://rest.entitysport.com/v2/matches/?status=2&token=${token}&per_page=50`
    );

    const data = await response.json();

    // caching this data on mongodb
    await Match.insertMany(data.response.items);

    return res.json(data.response.items);
  } catch (error) {
    console.error("Error fetching and caching data: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
app.post("/api/send-sms-otp", async (req, res) => {
  try {
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
        res.json({ msg: "OTP sent successfully", otp });
      })
      .catch((error) => {
        console.error("Error sending SMS:", error);
        res.status(500).json({ error: "Failed to send OTP via SMS" });
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Send OTP via Email
app.post("/api/send-email-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();

    const mailOptions = {
      from: {
        name: "Fannverse",
        address: process.env.GMAIL,
      },
      to: email,
      subject: "Fannverse OTP Verification Code",
      html: `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Fannverse: Official Fantasy Sports</a>
        </div>
        <p style="font-size:1.1em">Hello User,</p>
        <p>Welcome onboard, .<br>Use the following OTP to complete your Sign Up procedure. OTP is valid only for 5 minutes.</p>
        <h2 style="background: #000;margin: 0 auto;width: max-content;padding: 0 20px;color: #fff;border-radius: 25px; letter-spacing: 5px; font-size: 1.5em; color: skyblue;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />Fannverse Founding Team</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Support Team</p>
          <p>Fannverse Official &copy;2024</p>
        </div>
      </div>
      </div>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email", error);
        res.status(500).json({ error: "Failed to send OTP via email" });
      } else {
        console.log("Email sent: " + info.response);
        res.json({ msg: "OTP sent successfully", otp });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
