import mongoose, { Schema } from "mongoose";

const catagorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Catagory", catagorySchema);
