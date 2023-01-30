import mongoose from "mongoose";

const AffiliateStatScheme = new mongoose.Schema(
  {
    //one -> one relationship  | type of objectId that references the User collection
    userId: { type: mongoose.Types.ObjectId, ref: "User" },

    //one -> many relationship | an array of type objectId that references the Transaction collection
    affiliateSales: { type: [mongoose.Types.ObjectId], ref: "Transaction" },
  },
  { timestamps: true }
);

export default mongoose.model("AffiliateStat", AffiliateStatScheme);
