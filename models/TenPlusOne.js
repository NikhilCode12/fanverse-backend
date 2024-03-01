import mongoose from "mongoose";
import UserAccount from "./UserAccount.js";
import Match from "./Match.js";

const TenPlusOneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],
  teamsData:[{
    captainName:{type:String, required:true},
    vicecaptainName:{type:String, required:true},
    playersData:{type:Object}
  }]   
});

const TenPlusOne = mongoose.model("TenPlusOne", TenPlusOneSchema);
export default TenPlusOne;