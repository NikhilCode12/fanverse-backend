import mongoose from "mongoose";

const UserGoogleAuthSchema = new mongoose.Schema({
    googleId: {
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

const UserGoogleAuth = mongoose.model("UserGoogleAuth", UserGoogleAuthSchema);

export default UserGoogleAuth;
