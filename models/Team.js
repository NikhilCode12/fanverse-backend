import mongoose from "mongoose";
import UserAccount from "./UserAccount.js";
import Match from "./Match.js";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],
});

const Team = mongoose.model("Team", teamSchema);
export default Team;
