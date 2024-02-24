import UserAccount from "../models/UserAccount.js";
import jwt from "jsonwebtoken";

const secretKey = "eiy28whd78t";

// creating a new user
export const createUser = async (req, res) => {
  try {
    const { username, primaryInfo } = req.body;
    const { email, mobile } = primaryInfo;

    const existingUser = await UserAccount.findOne({ email, mobile });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new UserAccount({
      username,
      primaryInfo: {
        email,
        mobile,
      },
    });

    await newUser.save();

    // generating token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.primaryInfo.email },
      secretKey,
      {
        expiresIn: "1d",
      }
    );

    return res
      .status(201)
      .json({ msg: "User created successfully", newUser, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// getting user by token
export const getUserByToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token is missing!" });
    }

    const decodedToken = jwt.verify(token, secretKey);

    const user = await UserAccount.findById(decodedToken.userId);
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
