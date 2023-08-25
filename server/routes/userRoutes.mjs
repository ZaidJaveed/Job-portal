import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController.mjs";
import * as authController from "../controllers/authController.mjs";
// user routes
router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );
router
  .route("/apply/:id")
  .patch(
    authController.protect,
    authController.restrictTo("job-seeker"),
    userController.uploadResume,
    userController.applyJob
  );

router
  .route("/:id")
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUser
  );
export { router };
