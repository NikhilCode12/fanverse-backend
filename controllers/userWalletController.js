import UserWallet from "../models/UserWallet.js";

// creating a new userWallet
export const createUserWallet = async (req, res) => {
  try {
    const userWallet = await UserWallet.create(req.body);
    await userWallet.save();

    return res.status(201).json(userWallet);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// get all userWallets
export const getAllUserWallets = async (req, res) => {
  try {
    const userWallets = await UserWallet.find();
    return res.status(200).json(userWallets);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// get a userWallet by id
export const getUserWalletById = async (req, res) => {
  try {
    const userWalletId = req.params.id;
    const userWallet = await UserWallet.findById(userWalletId);
    if (!userWallet)
      return res.status(404).json({ error: "UserWallet not found" });
    return res.status(200).json(userWallet);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// update a userWallet by id
export const updateUserWalletById = async (req, res) => {
  try {
    const userWalletId = req.params.id;
    const userWallet = await UserWallet.findByIdAndUpdate(
      userWalletId,
      req.body,
      {
        new: true,
      }
    );
    if (!userWallet)
      return res.status(404).json({ error: "UserWallet not found" });
    return res.status(200).json(userWallet);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// delete a userWallet by id
export const deleteUserWalletById = async (req, res) => {
  try {
    const userWalletId = req.params.id;
    const userWallet = await UserWallet.findByIdAndDelete(userWalletId);
    if (!userWallet)
      return res.status(404).json({ error: "UserWallet not found" });
    return res.status(200).json(userWallet);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
