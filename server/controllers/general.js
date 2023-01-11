import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) res.status(404).json({ message: "User Not Found!" });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
