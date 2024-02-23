import mongoose from "mongoose";
import UserAccount from "./UserAccount";
import Match from "./Match";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],
});

const Team = mongoose.model("Team", teamSchema);
export default Team;
