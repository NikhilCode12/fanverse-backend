import mongoose from "mongoose";
const NineteenToTwentySchema = new mongoose.Schema({
      MegaPrize:{type:Number},
            PrizePool:{type:String,required:true},
            EntryFees:{type:Number,required:true},
            TotalSpots:{type:Number, required:true},
            SpotsLeft:{type:Number, required:true},
});
const NineteenToTwenty = mongoose.model("NineteenToTwenty",NineteenToTwentySchema);
export default NineteenToTwenty;