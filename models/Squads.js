import mongoose from "mongoose";

const squadsSchema = new mongoose.Schema({
  competitionId: {
    type: String,
    required: true,
  },
  matchId: {
    type: String,
    required: true,
  },
  squads: {
    type: Object,
    required: true,
  },
});

const Squads = mongoose.model("Squads", squadsSchema);

export default Squads;
