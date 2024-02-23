import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
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
app.get('/testbyaryan',(req,resp)=>{
  resp.send("ARYAN IS TEST IS OK");
});
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

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
