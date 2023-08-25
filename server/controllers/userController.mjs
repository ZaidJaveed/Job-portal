import multer from "multer";
import User from "../models/userModel.mjs";
import Job from "../models/jobModel.mjs";
import { catchAsync } from "../utils/catchAsync.mjs";
import AppError from "../utils/appError.mjs";
// multer
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/resumes");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("application")) cb(null, true);
  else cb(new AppError("please upload doc as pdf", 400), false);
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
const uploadResume = upload.single("resume");

const getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find({
    role: { $in: ["job-seeker", "job-poster"] },
  });
  if (!allUsers)
    return next(new AppError("No users have been created yet", 400));
  res.status(200).json({
    status: "Success",
    data: {
      allUsers,
    },
  });
});

// if user clicks on apply upload resume,change isApplied=true...also update job collection push user_id to applicants
const applyJob = catchAsync(async (req, res, next) => {
  const [user_id, job_id] = req.params.id.split("-");
  const db_filePath =
    req.file.destination.split("/")[1] + "/" + req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(
    user_id,
    { resume: db_filePath, hasApplied: true },
    { new: true, runValidators: true }
  );
  if (!updatedUser) return next(new AppError("No user found!", 404));
  const updatedJob = await Job.findByIdAndUpdate(
    job_id,
    {
      $addToSet: { applicants: user_id },
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    message: "User updated",
    data: {
      updatedJob,
      updatedUser,
    },
  });
});
const updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) return new AppError("User not found", 400);
  res.status(200).json({
    status: "Success",
    message: "User Updated",
    data: {
      updatedUser,
    },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  // delete jobs added by that user/delete user data from job applicants
  if (req.role === "admin") {
    const deljobs = await Job.deleteMany({ postedBy: req.params.id });
  } else {
    const jobs = await Job.updateMany(
      {},
      { $pull: { applicants: req.params.id } }
    );
  }
  // delete user
  const delUser = await User.findByIdAndDelete(req.params.id);
  // console.log(delUser);
  if (!delUser) return next(new AppError("User not found!", 404));

  res.status(204).json({
    status: "Success",
    data: null,
  });
});
export { getAllUsers, uploadResume, applyJob, updateUser, deleteUser };
