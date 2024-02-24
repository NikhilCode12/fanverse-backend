import UserAccount from "../models/UserAccount.js";
import jwt from "jsonwebtoken";

// creating a new user
export const createUser = async (req, res) => {
  try {
    const { username, primaryInfo } = req.body;

    // generate token for the user authorization
    const userToken = jwt.sign(
      {
        id: username,
        email: primaryInfo.email,
        phoneNum: primaryInfo.phoneNum,
      },
      "fanverseUserCreationSecret@%$#^&*!@#Token"
    );

    const user = await UserAccount.create({
      username,
      primaryInfo,
      authToken: userToken,
    });

    await user.save();

    res.status(200).json(user, userToken);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// getting user by token
export const getUserByToken = async (req, res) => {
  try {
    const user = await UserAccount.findOne({ authToken: req.params.token });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// getting user by id
export const getUserById = async (req, res) => {
  try {
    const user = await UserAccount.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// getting all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserAccount.find();
    if (!users) return res.status(404).json({ message: "No users found" });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// update user by id
export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await UserAccount.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// delete user by id
export const deleteUserById = async (req, res) => {
  try {
    const deleteUser = await UserAccount.findByIdAndDelete(req.params.id);
    if (!deleteUser) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
