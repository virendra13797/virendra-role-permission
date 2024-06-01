import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});
export default mongoose.model("Like", likeSchema);
