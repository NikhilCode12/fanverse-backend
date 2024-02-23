import Match from "../models/Match";

// creating a new match
export const createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    await match.save();
    return res.status(201).json(match);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// get all matches
export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    return res.status(200).json(matches);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// get a match by id
export const getMatchById = async (req, res) => {
  try {
    const matchId = req.params.id;
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ error: "Match not found" });
    return res.status(200).json(match);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// update a match by id
export const updateMatchById = async (req, res) => {
  try {
    const matchId = req.params.id;
    const match = await Match.findByIdAndUpdate(matchId, req.body, {
      new: true,
    });
    if (!match) return res.status(404).json({ error: "Match not found" });
    return res.status(200).json(match);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// delete a match by id
export const deleteMatchById = async (req, res) => {
  try {
    const matchId = req.params.id;
    const match = await Match.findByIdAndDelete(matchId);
    if (!match) return res.status(404).json({ error: "Match not found" });
    return res.status(200).json(match);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
