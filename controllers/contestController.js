import Contest from "../models/Contest.js";

// creating a new contest
export const createContest = async (req, res) => {
  try {
    const contest = await Contest.create(req.body);
    await contest.save();
    return res.status(201).json(contest);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// getting contest by id
export const getContestById = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) {
      return res.status(404).json({ error: "Contest not found" });
    }
    return res.status(200).json(contest);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// getting all contests
export const getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find();
    if (!contests) {
      return res.status(404).json({ error: "No contests found" });
    }
    return res.status(200).json(contests);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// update contest by id
export const updateContestById = async (req, res) => {
  try {
    const updatedContest = await Contest.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedContest) {
      return res.status(404).json({ error: "Contest not found" });
    }
    return res.status(200).json(updatedContest);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// delete contest by id
export const deleteContestById = async (req, res) => {
  try {
    const deleteContest = await Contest.findByIdAndDelete(req.params.id);
    if (!deleteContest) {
      return res.status(404).json({ error: "Contest not found" });
    }
    return res.status(200).json({ message: "Contest deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
