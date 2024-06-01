import mongoose, { Schema } from "mongoose";

const permissionSchema = new Schema({
  permission_name: {
    type: String,
    permission_value: [Number],
  },

  is_default: {
    type: Number,
    default: 0, // 0-> not default ,1-> default
  },
});
export default mongoose.model("Permission", permissionSchema);
