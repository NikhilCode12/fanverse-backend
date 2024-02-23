import CricketPlayer from "../models/CricketPlayer.js";

// creating a new player
export const createPlayer = async (req, res) => {
  try {
    const player = await CricketPlayer.create(req.body);
    await player.save();
    return res.status(201).json(player);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// getting player by id
export const getPlayerById = async (req, res) => {
  try {
    const player = await CricketPlayer.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    return res.status(200).json(player);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// getting all players
export const getAllPlayers = async (req, res) => {
  try {
    const players = await CricketPlayer.find();
    if (!players) return res.status(404).json({ message: "No players found" });
    return res.status(200).json(players);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// update player by id
export const updatePlayerById = async (req, res) => {
  try {
    const updatedPlayer = await CricketPlayer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedPlayer)
      return res.status(404).json({ message: "Player not found" });
    return res.status(200).json(updatedPlayer);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// delete player by id
export const deletePlayerById = async (req, res) => {
  try {
    const deletePlayer = await CricketPlayer.findByIdAndDelete(req.params.id);
    if (!deletePlayer)
      return res.status(404).json({ message: "Player not found" });
    return res.status(200).json({ message: "Player deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
