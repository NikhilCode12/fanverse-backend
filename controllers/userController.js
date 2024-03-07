import UserAccount from "../models/UserAccount.js";
import jwt from "jsonwebtoken";
import {nanoid} from "nanoid";
import mongoose from "mongoose";
const secretKey = "eiy28whd78t";

// creating a new user
export const createUser = async (req, res) => {
  try {
    const {  email, mobile } = req.body;
    const ReceivedEmail = email;
    const ReceivedMobile = mobile;
    const existingUser = ReceivedEmail==""?await UserAccount.findOne({ mobile }):await UserAccount.findOne({ email });
    if (existingUser)
    {
      const token = jwt.sign(
        {
        userId: existingUser._id,
        email: existingUser.email,
        mobile: existingUser.mobile,
      },
      secretKey,
      {
        expiresIn: "1d",
      }
    );
      return res
      .status(201)
      .json({ msg: "User Already Registered", existingUser, token });
    }
    // if the user is not registered prevoiusly then only it will get registered and the code below will run
    const username = nanoid(10);
    const emailId = email==="" ? nanoid(10) : email; 
    const mobileId = mobile==="" ? nanoid(10) : mobile;
    const emailVerified = email===""?false:true;
    const mobileVerified = mobile===""?false:true;
    const newUser = new UserAccount({  
    username:username,
    email: emailId,
    mobile: mobileId,
    emailVerified,
    mobileVerified,
    });
    
    await newUser.save();

    // generating token
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        mobile: newUser.mobile,
      },
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
    const{username,email,mobile}=req.body;
    if(username)
    {
      const existingUser = await UserAccount.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists. Choose a different one.' });
      }
    }
    if(email)
    {
        const existingUser = await UserAccount.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'email already exists. Choose a different one.' });
      }
    }
    if(mobile)
    {
        const existingUser = await UserAccount.findOne({ mobile });
      if (existingUser) {
        return res.status(400).json({ error: 'Mobile no. already exists. Choose a different one.' });
      }
    }
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

// get a username or email
export const findUserAndRegister = async (req, res) => {
  try {
    const email = req.body.email;
    const username = req.body.username;
    const mobile = req.body.mobile;
    const user = await UserAccount.findOne({email});
    const user2 = await UserAccount.findOne({mobile});
    if (user)
      return res.status(400).json({ msg: "User Already registered" });
    else if(user2)
    {
      return res.status(400).json({ msg: "User Already registered through same mobile" });
    }
    else{
      const user = await UserAccount.findOne({username});
      if(user)
      {
        return res.status(401).json({ msg: "Username Already Taken" });
      }
      else{

        const newUser = new UserAccount({username:username,email:email,emailVerified:true,mobile,mobileVerified:true});
        await newUser.save();
        return res.status(200).json({msg:"Sucessfully Registered",newUser});
      }
    }
    // return res.status(200).json(userWallet);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// update user contests..
export const joinContest = async (req, res) => {
  const { token, contestId } = req.body;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, secretKey); // Replace 'your-secret-key' with your actual secret key

    const userId = decoded.userId;


    const user = await UserAccount.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the matchId already exists in the contests array
    if (user.contests.includes(contestId)) {
      return res.status(400).json({ error: 'User already joined this contest' });
    }

    // Push the matchId into the contests array
    user.contests.push(contestId);

    // Save the updated user object
    await user.save();

    return res.status(200).json({ message: 'User joined contest successfully' });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};