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
import UserAccount from "./models/UserAccount.js";
import SevenPlusFourRoutes from "./routes/SevenPlusFourRoutes.js";
import TenPlusOneRoutes from "./routes/TenPlusOneRoutes.js";
import FantasticFiveRoutes from "./routes/FantasticFiveRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import Squads from "./models/Squads.js";
import Competition from "./models/Competitions.js";
import OneToThreeRoutes from "./routes/BallByBall/OneToThreeRoutes.js";
import FourToSixRoutes from "./routes/BallByBall/FourToSixRoutes.js";
import SevenToNineRoutes from "./routes/BallByBall/SevenToNineRoutes.js";
import TenToTwelveRoutes from "./routes/BallByBall/TenToTwelveRoutes.js";
import ThirteenToFifteenRoutes from "./routes/BallByBall/ThirteenToFifteenRoutes.js";
import SixteenToEighteenRoutes from "./routes/BallByBall/SixteenToEighteenRoutes.js";
import NineteenToTwentyRoutes from "./routes/BallByBall/NineteenToTwentyRoutes.js";
import rankingUsers from "./models/RankingBBB.js";
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
app.use("/api/sevenplusfour", SevenPlusFourRoutes);
app.use("/api/tenplusone", TenPlusOneRoutes);
app.use("/api/fantasticfive", FantasticFiveRoutes);
app.use("/api/ballbyball/onetothree", OneToThreeRoutes);
app.use("/api/ballbyball/fourtosix", FourToSixRoutes);
app.use("/api/ballbyball/seventonine", SevenToNineRoutes);
app.use("/api/ballbyball/tentotwelve", TenToTwelveRoutes);
app.use("/api/ballbyball/thirteentofifteen", ThirteenToFifteenRoutes);
app.use("/api/ballbyball/sixteentoeighteen", SixteenToEighteenRoutes);
app.use("/api/ballbyball/nineteentotwenty", NineteenToTwentyRoutes);
// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// get all users from ranking users
app.get("/api/ranking/all", async (req, res) => {
  try {
    const users = await rankingUsers.find().sort({ points: -1 });
    return res.json(users);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// create ranking of user and also update their points
app.post("/api/ranking", async (req, res) => {
  const { username, points } = req.body;

  try {
    // Check if the user already exists
    let user = await rankingUsers.findOne({ username });

    if (!user) {
      // If the user does not exist, create a new user
      user = new rankingUsers({ username, points });
      await user.save();
      return res.status(201).json(user);
    } else {
      // If the user exists, update the points
      user.points += points;
      await user.save();
      return res.status(200).json(user);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// calling the entity sports api periodically to get live match ball
// by ball updates and then cache it in our db for all users to see
let cachedLiveMatchData = null;

const liveMatchSchema = new mongoose.Schema({
  matchId: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
  },
});

const LiveMatch = mongoose.model("LiveMatch", liveMatchSchema);

// end point to serve cached live match data
app.get("/api/live-match/", async (req, res) => {
  try {
    // fetch live match data from our db
    const { matchId } = req.query;

    const response = await fetch(
      `https://rest.entitysport.com/v2/matches/${matchId}/live?token=9b2e91bc61fd2a2e0af29a5ecba16642`
    );
    const data = await response.json();

    // Cache live match data in our db
    const liveMatch = await LiveMatch.findOne({ matchId });

    if (!liveMatch) {
      const newLiveMatch = new LiveMatch({
        matchId,
        data,
      });
      await newLiveMatch.save();
    } else {
      await LiveMatch.updateOne({ matchId }, { data });
    }

    return res.json(data);
  } catch (error) {
    console.error("Error serving live match data: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to find a user by username and email
app.get("/api/find-user", async (req, res) => {
  try {
    const { username, email } = req.query;

    if (!username && !email) {
      return res
        .status(400)
        .json({ error: "Username or email is required to find a user" });
    }

    // Find user by username or email
    const user = await UserAccount.findOne({ $or: [{ username }, { email }] });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the found user
    res.json(user);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// squads route to get player squads list from API and then cache them in our database
app.get("/api/squads", async (req, res) => {
  try {
    const { competitionId, matchId } = req.query;

    if (!competitionId || !matchId) {
      return res.status(400).json({
        error: "Competition ID and Match ID are required to get squads",
      });
    }

    // Check if squads are already cached in the database
    const cachedSquads = await Squads.findOne({ matchId });

    if (cachedSquads) {
      return res.json(cachedSquads);
    }

    // If squads are not cached, fetch them from the API
    const response = await fetch(
      `https://rest.entitysport.com/v2/competitions/${competitionId}/squads/${matchId}?token=9b2e91bc61fd2a2e0af29a5ecba16642`
    );

    const data = await response.json();

    // Cache squads in the database
    const squads = new Squads({
      competitionId: competitionId,
      matchId: matchId,
      squads: data.response.squads,
    });
    await squads.save();

    return res.json(data);
  } catch (error) {
    console.error("Error fetching and caching data: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// competition route to get all the competitions list which are under our subscription
app.get("/api/competitions/all", async (req, res) => {
  try {
    // caching this data on mongodb
    const cachedCompetitions = await Competition.find();

    if (cachedCompetitions.length > 0) {
      return res.json(cachedCompetitions);
    }

    const response1 = await fetch(
      `https://rest.entitysport.com/v2/competitions?token=9b2e91bc61fd2a2e0af29a5ecba16642&per_page=50&status=live
      `
    );

    const response2 = await fetch(
      `https://rest.entitysport.com/v2/competitions?token=9b2e91bc61fd2a2e0af29a5ecba16642&per_page=50&status=fixture
      `
    );

    // merge both the responses

    const data1 = await response1.json();
    const data2 = await response2.json();
    const data = data1.response.items.concat(data2.response.items);

    await Competition.insertMany(data);

    // get the data of matches for each competition cid from the entity sports api and then cache it in our db matches
    for (let i = 0; i < data.length; i++) {
      const cachedMatches = await Match.find({ cid: data[i].cid });

      if (cachedMatches.length > 0) {
        continue;
      }

      const response = await fetch(
        `https://rest.entitysport.com/v2/competitions/${data[i].cid}/matches?token=9b2e91bc61fd2a2e0af29a5ecba16642`
      );

      const matchesData = await response.json();

      await Match.insertMany(matchesData.response.items);
    }

    return res.json(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// matches route to get matches list from Entity sporst and then cache it in our db matches
app.get("/api/matches/", async (req, res) => {
  try {
    const { competitionId } = req.query;
    const cachedMatches = await Match.find();

    if (cachedMatches.length > 0) {
      return res.json(cachedMatches);
    }

    // Fetch data from entity sports api
    const response = await fetch(
      `https://rest.entitysport.com/v2/competitions/${competitionId}/matches?token=9b2e91bc61fd2a2e0af29a5ecba16642`
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

// route to delete a expired match from db
app.delete("/api/matches/delete-expired", async (req, res) => {
  try {
    const { competitionId, matchId } = req.query;

    const match = await Match.findOne({ matchId });
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    // Delete match from db
    await match.delete();

    return res.json({ msg: "Match deleted successfully" });
  } catch (error) {
    console.error("Error deleting expired matches: ", error);
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
