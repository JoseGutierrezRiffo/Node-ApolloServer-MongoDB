import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  avatar: {
    type: String,
    trim: true
  },
  site: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model("User", UserSchema);
