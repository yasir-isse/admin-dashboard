import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    cost: String,
    userId: String,
    products: {
      type: [mongoose.Types.ObjectId],
      of: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
