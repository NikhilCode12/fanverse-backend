import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  league: { type: String },
  teamA: { name: { type: String }, teamPfp: { type: String } },
  teamB: { name: { type: String }, teamPfp: { type: String } },
  venue: { type: String },
  dateTime: { type: Date },
  timeRemaining: { type: String },
  winnings: { type: Number },
  notified: { type: Boolean, default: false },
});

const Match = mongoose.model("Match", matchSchema);
export default Match;
