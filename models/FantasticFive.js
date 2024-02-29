import mongoose from "mongoose";
import UserAccount from "./UserAccount.js";
import Match from "./Match.js";

const FantasticFiveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],
  teamsData:[{
    TopOne:{type:String, required:true},
    TopTwo:{type:String, required:true},
    TopThree:{type:String, required:true},
    playersData:{type:Object}
  }]   
});

const FantasticFive = mongoose.model("FantasticFive", FantasticFiveSchema);
export default FantasticFive;