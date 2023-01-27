import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStat.find();
    //the db query will return an array with one property
    //so, we return that one property (single object)
    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
