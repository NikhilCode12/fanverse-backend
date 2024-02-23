import mongoose from "mongoose";

const UserFacebookAuthSchema = new mongoose.Schema({
    FacebookId: {
      type: String,
    },
    userName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  email: {
    type: String,
    required: true,
    unique: true,
  },
    profilePicture: {
      type: String,
    },
});

const UserFacebookAuth = mongoose.model("UserFacebookAuth", UserFacebookAuthSchema);

export default UserFacebookAuth;
