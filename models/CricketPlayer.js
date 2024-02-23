import mongoose from "mongoose";

const cricketPlayerSchema = new mongoose.Schema({
  playerTeam: { type: String },
  playerPoints: { type: Number },
  teamATotal: { type: Number },
  teamBTotal: { type: Number },
  credits: { type: Number },
  selected: { type: Boolean, default: false },
  playerSkill: { type: String },
  captainSelected: { type: Boolean, default: false },
  viceCaptainSelected: { type: Boolean, default: false },
  captainPercentage: { type: Number },
  viceCaptainPercentage: { type: Number },
});

const CricketPlayer = mongoose.model("CricketPlayer", cricketPlayerSchema);
export default CricketPlayer;
