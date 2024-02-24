import UserAccount from "../models/UserAccount.js";
import jwt from "jsonwebtoken";
import { promisify } from 'util';

const verifyAsync = promisify(jwt.verify);
const secretKey = 'eiy28whd78t';
// creating a new user
export const createUser = async (req, res) => {
  try {
    const user = new UserAccount(req.body);
    await user.save();
    const { primaryInfo} = req.body;
      const mobile = primaryInfo.mobile;
       const email = primaryInfo.email;
      const token = jwt.sign({email,mobile }, secretKey, { expiresIn: '1h' }); 
      res.status(200).json({ user, token });
    // res.status(200).json("hh");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// getting user by token
export const getUserByToken = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Token is missing' });
    }

    const decoded = await verifyAsync(token.replace('Bearer ', ''), secretKey);
    const {mobile,email } = decoded;
    const primaryInfo = {
      mobile: mobile,
      email: email
    };

    const user = await UserAccount.findOne(primaryInfo);
    // console.log(primaryinfo)

    if (!user) return res.status(404).json({ message: "User not found" ,primaryInfo});

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
