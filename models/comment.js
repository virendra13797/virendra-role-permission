import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },

  comment: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Comment", commentSchema);
