import mongoose from "mongoose";

const competitionSchema = new mongoose.Schema({
  cid: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  abbr: String,
  category: String,
  status: String,
  game_format: String,
  season: String,
  datestart: Date,
  dateend: Date,
  country: String,
  total_matches: Number,
  total_rounds: Number,
  total_teams: Number,
});

const Competition = mongoose.model("Competition", competitionSchema);

export default Competition;
