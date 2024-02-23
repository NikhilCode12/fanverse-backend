import UserAuth from "../models/UserAuth.js";
import UserGoogleAuth from "../models/UserGoogleAuth.js";
import UserFacebookAuth from "../models/UserFacebookAuth.js";
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
    const { googleId} = req.body;
    const user = await UserGoogleAuth.findOne({ googleId });
    if (user)
      return res.status(201).json(user);
    
    const newUser = new UserGoogleAuth(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// register with facebook
export const registerWithFacebook = async (req, res) => {
  try {
    const { FacebookId } = req.body;
    const user = await UserFacebookAuth.findOne({ FacebookId });
    if (user)
      return res.status(201).json(req.body);
    const newUser = new UserFacebookAuth(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
