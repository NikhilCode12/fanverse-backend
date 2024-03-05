import OneToThree from "../models/BallByBall/OneToThree";
import FourToSix from "../models/BallByBall/FourToSix";
import SevenToNine from "../models/BallByBall/SevenToNine";
import TenToTwelve from "../models/BallByBall/TenToTwelve";
import ThirteenToFifteen from "../models/BallByBall/ThirteenToFifteen";
import SixteenToEighteen from "../models/BallByBall/SixteenToEighteen";
import NineteenToTwenty from "../models/BallByBall/NineteenToTwenty";

export const createContestOneToThree=async (req,resp)=>{
   try {
    const contest = await OneToThree.create(req.body);
    await contest.save();
    return resp.status(201).json(contest);
  } catch (err) {
    return resp.status(500).json({ error: err.message });
  }
}
export const createContestFourToSix=async (req,resp)=>{
   try {
    const contest = await FourToSix.create(req.body);
    await contest.save();
    return resp.status(201).json(contest);
  } catch (err) {
    return resp.status(500).json({ error: err.message });
  }
}
export const createContestSevenToNine=async (req,resp)=>{
   try {
    const contest = await SevenToNine.create(req.body);
    await contest.save();
    return resp.status(201).json(contest);
  } catch (err) {
    return resp.status(500).json({ error: err.message });
  }
}
export const createContestTenToTwelve=async (req,resp)=>{
   try {
    const contest = await TenToTwelve.create(req.body);
    await contest.save();
    return resp.status(201).json(contest);
  } catch (err) {
    return resp.status(500).json({ error: err.message });
  }
}
export const createContestThirteenToFifteen=async (req,resp)=>{
   try {
    const contest = await ThirteenToFifteen.create(req.body);
    await contest.save();
    return resp.status(201).json(contest);
  } catch (err) {
    return resp.status(500).json({ error: err.message });
  }
}
export const createContestSixteenToEighteen=async (req,resp)=>{
   try {
    const contest = await SixteenToEighteen.create(req.body);
    await contest.save();
    return resp.status(201).json(contest);
  } catch (err) {
    return resp.status(500).json({ error: err.message });
  }
}
export const createContestNineteenToTwenty=async (req,resp)=>{
   try {
    const contest = await NineteenToTwenty.create(req.body);
    await contest.save();
    return resp.status(201).json(contest);
  } catch (err) {
    return resp.status(500).json({ error: err.message });
  }
}