import mongoose from "mongoose";

const UserAuthSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  google: {
    profilePicture: {
      type: String,
    },
    userName: {
      type: String,
    },
    googleId: {
      type: String,
    },
  },
  facebook: {
    profilePicture: {
      type: String,
    },
    userName: {
      type: String,
    },
    facebookId: {
      type: String,
    },
  },
});

const UserAuth = mongoose.model("UserAuth", UserAuthSchema);

export default UserAuth;
