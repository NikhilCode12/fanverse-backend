import UserAuth from "../models/UserAuth";

// register with email
export const registerWithEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserAuth.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already exists" });

    const newUser = new UserAuth({ email });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// register with mobile
export const registerWithMobile = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    const user = await UserAuth.findOne({ mobile });
    if (user)
      return res.status(400).json({ error: "Mobile number already exists" });

    const newUser = new UserAuth({ mobileNumber });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// register with google
export const registerWithGoogle = async (req, res) => {
  try {
    const { googleId } = req.body;
    const user = await UserAuth.findOne({ googleId });
    if (user)
      return res.status(400).json({ error: "Google account already exists" });

    const newUser = new UserAuth({ googleId });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// register with facebook
export const registerWithFacebook = async (req, res) => {
  try {
    const { facebookId } = req.body;
    const user = await UserAuth.findOne({ facebookId });
    if (user)
      return res.status(400).json({ error: "Facebook account already exists" });
    const newUser = new UserAuth({ facebookId });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
