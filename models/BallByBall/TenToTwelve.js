import mongoose from "mongoose";
const TenToTwelveSchema = new mongoose.Schema({
      MegaPrize:{type:Number},
            PrizePool:{type:String,required:true},
            EntryFees:{type:Number,required:true},
            TotalSpots:{type:Number, required:true},
            SpotsLeft:{type:Number, required:true},
});
const TenToTwelve = mongoose.model("TenToTwelve",TenToTwelveSchema);
export default TenToTwelve;