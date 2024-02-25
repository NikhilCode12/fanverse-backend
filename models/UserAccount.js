import mongoose from "mongoose";
import Match from "./Match.js";
import Contest from "./Contest.js";
import Team from "./Team.js";

const UserAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  contestsWon: {
    type: Number,
    default: 0,
  },
  totalContests: {
    type: Number,
    default: 0,
  },
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      default: null,
    },
  ],
  series: {
    type: Number,
    default: 0,
  },
  contests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
    },
  ],
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  mobile: { type: String, unique: true },
  email: { type: String, unique: true },
  basicInfo: {
    dob: { type: String, default: "DD/MM/YY" },
    gender: { type: String, default: "Unknown" },
    country: { type: String, default: "India" },
    state: { type: String, default: "Unknown" },
  },
  points: {
    type: Number,
    default: 0,
  },
  authToken: {
    type: String,
  },
});

const UserAccount = mongoose.model("UserAccount", UserAccountSchema);
export default UserAccount;
