import mongoose from "mongoose";
const OneToThreeSchema = new mongoose.Schema({
      MegaPrize:{type:Number},
            PrizePool:{type:String,required:true},
            EntryFees:{type:Number,required:true},
            TotalSpots:{type:Number, required:true},
            SpotsLeft:{type:Number, required:true},
});
const OneToThree = mongoose.model("OneToThree",OneToThreeSchema);
export default OneToThree;