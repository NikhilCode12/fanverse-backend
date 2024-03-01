import FantasticFive from "../models/FantasticFive.js";

export const createTeam = async (req, res) => {
  try {
    const team = await FantasticFive.create(req.body);
    await team.save();
    return res.status(201).json(team);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// getting all teams
export const getAllTeams = async (req, res) => {
  try {
    const teams = await FantasticFive.find();
    if (!teams) return res.status(404).json({ message: "No teams found" });
    return res.status(200).json(teams);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// delete team by id
export const deleteTeamById = async (req, res) => {
  try {
    const deleteTeam = await FantasticFive.findByIdAndDelete(req.params.id);
    if (!deleteTeam)
      return res.status(404).json({ message: "Team not found" });
    return res.status(200).json({ message: "Team deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};