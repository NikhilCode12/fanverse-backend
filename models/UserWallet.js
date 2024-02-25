import mongoose from "mongoose";
import UserAccount from "./UserAccount.js";

const userWalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
  currentBalance: { type: Number, default: 0 },
  amountUnutilized: { type: Number, default: 0 },
  winnings: { type: Number, default: 0 },
  discountBonus: { type: Number, default: 0 },
  transactions: [
    {
      id: { type: mongoose.Schema.Types.ObjectId },
      withdrawal: { type: Number, default: 0 },
      deposit: { type: Number, default: 0 },
    },
  ],
  payments: {
    cardDetails: {
      name: { type: String },
      cardNo: { type: String },
      expiryDate: { type: Date },
      cvv: { type: String },
    },
  },
  invitePage: {
    userReference: { type: String },
    referCode: { type: String },
  },
});

const UserWallet = mongoose.model("UserWallet", userWalletSchema);
export default UserWallet;
