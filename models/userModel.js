import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0, // 0 normalUser 1 admin 2 subadmin 3 editor,
  },
});

export default mongoose.model("User", userSchema);
