import mongoose from "mongoose";
import Match from "./Match.js";
import Contest from "./Contest.js";
import UserAuth from "./UserAuth.js";
import Team from "./Team.js";

const UserAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAuth",
  },
  contestsWon: {
    type: Number,
    default: 0,
  },
  totalContests: {
    type: Number,
    default: 0,
  },
  matches: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
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
  primaryInfo: {
    mobile: { type: String },
    email: { type: String },
  },
  basicInfo: {
    dob: { type: Date },
    gender: { type: String },
    country: { type: String },
    state: { type: String },
  },
});

const UserAccount = mongoose.model("UserAccount", UserAccountSchema);
export default UserAccount;
