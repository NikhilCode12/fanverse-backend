import mongoose from "mongoose";
const SevenToNineSchema = new mongoose.Schema({
      MegaPrize:{type:Number},
            PrizePool:{type:String,required:true},
            EntryFees:{type:Number,required:true},
            TotalSpots:{type:Number, required:true},
            SpotsLeft:{type:Number, required:true},
});
const SevenToNine = mongoose.model("SevenToNine",SevenToNineSchema);
export default SevenToNine;