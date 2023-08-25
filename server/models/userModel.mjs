import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    select: false,
  },
  resume: {
    type: String,
  },
  role: {
    type: String,
    enum: ["job-seeker", "job-poster", "admin"],
    default: "job-seeker",
  },
  hasApplied: {
    type: Boolean,
    default: false,
  },
});
userSchema.pre("save", async function (next) {
  // only run if pass was modified or a new user is created
  if (!this.isModified("password")) return next();
  // hash pass with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});
// create an instance method that is available to all the docs of a collection
userSchema.methods.verifyPassword = function (enteredPassword, dbPassword) {
  return bcrypt.compare(enteredPassword, dbPassword);
};
const User = mongoose.model("User", userSchema);
export default User;
