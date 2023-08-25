import Job from "../models/jobModel.mjs";
import { catchAsync } from "../utils/catchAsync.mjs";
import AppError from "../utils/appError.mjs";
// create job
const createJob = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  // console.log(id);
  // console.log({ ...req.body, postedBy: user_id, applicants: [] });
  const newJob = await Job.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    organization: req.body.organization,
    postedBy: user_id,
  });
  res.status(201).json({
    status: "Success",
    message: "Job created",
    data: {
      newJob,
    },
  });
});
// get jobs posted by a job poster and users who applied to jobs posted by that user
const getJobs = catchAsync(async (req, res, next) => {
  let jobs;
  const { id: job_poster_id } = req.params;
  if (Object.keys(req.query).length === 0 || req.query.filter == "all") {
    jobs = await Job.find({ postedBy: job_poster_id }).populate([
      {
        path: "postedBy",
        select: " -__v -hasApplied", // Include multiple fields
      },
      {
        path: "applicants",
        select: "-__v -hasApplied",
      },
    ]);
  } else {
    jobs = await Job.find({
      postedBy: job_poster_id,
      category: req.query.filter,
    }).populate([
      {
        path: "postedBy",
        select: " -__v -hasApplied", // Include multiple fields
      },
      {
        path: "applicants",
        select: "-__v -hasApplied",
      },
    ]);
  }
  res.status(200).json({
    status: "Success",
    data: {
      jobs,
    },
  });
});
const getAllJobs = catchAsync(async (req, res, next) => {
  let jobs;

  if (Object.keys(req.query).length === 0 || req.query.filter == "all") {
    jobs = await Job.find({}).populate("postedBy");
  } else {
    jobs = await Job.find({ category: req.query.filter }).populate("postedBy");
  }
  // console.log(jobs);
  res.status(200).json({
    status: "Success",
    data: {
      jobs,
    },
  });
});
const deleteJob = catchAsync(async (req, res, next) => {
  const delJob = await Job.findByIdAndDelete(req.params.id);
  // console.log(delJob);
  if (!delJob) return next(new AppError("User not found!", 404));
  res.status(204).json({
    status: "Success",
    data: null,
  });
});
const updateJob = catchAsync(async (req, res, next) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updateJob) return new AppError("Job not Found", 404);
  res.status(200).json({
    status: "Success!",
    message: "Job updated",
    data: updatedJob,
  });
});
export { createJob, getJobs, getAllJobs, deleteJob, updateJob };
