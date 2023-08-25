import express from "express";
const router = express.Router();
import * as authController from "../controllers/authController.mjs";
import * as jobController from "../controllers/jobController.mjs";
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "job-seeker", "job-poster"),
    jobController.getAllJobs
  )
  .post(
    authController.protect,
    authController.restrictTo("admin", "job-poster"),
    jobController.createJob
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin", "job-poster"),
    jobController.getJobs
  ) //getjobs of particular job poster and users who applied to that post
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    jobController.deleteJob
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin", "job-poster"),
    jobController.updateJob
  );
export { router };
