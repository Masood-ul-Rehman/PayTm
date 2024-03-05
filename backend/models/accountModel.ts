import mongoose from "mongoose";

const Account = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  balance: {
    type: Number,
    require: true,
  },
});
export default mongoose.model("Account", Account);
