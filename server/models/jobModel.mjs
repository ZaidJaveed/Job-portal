import mongoose from "mongoose";
const Schema = mongoose.Schema;
const jobSchema = new Schema({
  title: {
    type: String,
    required: [true, "please enter job title"],
  },
  description: {
    type: String,
    required: [true, "please enter job description"],
  },
  category: {
    type: String,
    required: [true, "please enter job category"],
    lowercase: true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  organization: {
    type: String,
  },
  applicants: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
});
const Job = mongoose.model("Job", jobSchema);
export default Job;
