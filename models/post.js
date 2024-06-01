import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  discription: {
    type: String,
    required: true,
  },

  catagories: {
    type: Array,
    required: false,
  },
});
export default mongoose.model("Post", postSchema);
