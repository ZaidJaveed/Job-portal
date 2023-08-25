import { catchAsync } from "../utils/catchAsync.mjs";
import User from "../models/userModel.mjs";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.mjs";
import { promisify } from "util";
const signToken = function (id, role) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  //  token headeers are created automatically
  const token = signToken(newUser._id, newUser.role);

  res.status(201).json({
    status: "Success",
    token,
    data: {
      newUser,
    },
  });
});
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //   1 check if email and password exist
  if (!email || !password)
    return next(new AppError("Please enter email and password", 400));
  //   2 verify email and password
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.verifyPassword(password, user.password)))
    return next(new AppError("incorrect email or password", 400));
  //   3 send token to client
  const token = signToken(user._id, user.role);
  res.status(200).json({
    status: "Success!",
    token,
  });
});
const protect = catchAsync(async (req, res, next) => {
  let token;
  // 1 check if token exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return next(
      new AppError("You are not Logged in, please login to get access", 401)
    );
  // 2  verify token
  //verify is  async---promisify it so that we can use async await---use util
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3 check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError("The user belonging to this token, no longer exist", 401)
    );
  // grant access to protected routes
  req.user = currentUser;
  next();
});
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("you are not authorized to perform this action", 401)
      );
    next();
  };
};

export { signUp, login, protect, restrictTo };
