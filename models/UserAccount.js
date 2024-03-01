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
  currentBalance: { type: Number, default: 0 },
  amountUnutilized: { type: Number, default: 0 },
  winnings: { type: Number, default: 0 },
  discountBonus: { type: Number, default: 25 },
  transactions: [
    {
      id: { type: mongoose.Schema.Types.ObjectId },
      withdrawal: { type: Number, default: 0 },
      deposit: { type: Number, default: 0 },
    },
  ],
  payments: [
    {
      name: { type: String },
      cardNo: { type: String },
      expiryDate: { type: Date },
      cvv: { type: String },
    },
  ],
  invitePage: {
    userReference: { type: String },
    referCode: { type: String },
  },
  usernameVerified:{ type:Boolean,default:false},
  mobileVerified:{ type:Boolean,default:false},
  emailVerified:{ type:Boolean,default:false},
});

const UserAccount = mongoose.model("UserAccount", UserAccountSchema);
export default UserAccount;
