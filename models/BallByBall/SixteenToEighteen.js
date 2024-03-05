import mongoose from "mongoose";
const SixteenToEighteenSchema = new mongoose.Schema({
      MegaPrize:{type:Number},
            PrizePool:{type:String,required:true},
            EntryFees:{type:Number,required:true},
            TotalSpots:{type:Number, required:true},
            SpotsLeft:{type:Number, required:true},
});
const SixteenToEighteen = mongoose.model("SixteenToEighteen",SixteenToEighteenSchema);
export default SixteenToEighteen;