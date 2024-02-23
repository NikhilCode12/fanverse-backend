import mongoose from "mongoose";
import UserAccount from "./UserAccount.js";

const contestSchema = new mongoose.Schema({
  type: { type: String },
  variation: { type: String },
  winners: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" }],
  prizePool: { type: Number },
  entryFee: { type: Number },
  totalSpots: { type: Number },
  joinedSpots: { type: Number },
  megaPrize: { type: Number },
  teamsTotal: { type: Number },
});

const Contest = mongoose.model("Contest", contestSchema);
export default Contest;
