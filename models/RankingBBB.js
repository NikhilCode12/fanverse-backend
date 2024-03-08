import mongoose from "mongoose";

const rankingUsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const rankingUsers = mongoose.model("RankingUsers", rankingUsersSchema);

export default rankingUsers;
