import mongoose from "mongoose";
import Match from "./Match";
import Contest from "./Contest";
import UserAuth from "./UserAuth";
import Team from "./Team";

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
