import jwt from "jsonwebtoken";

import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    const token =
      req.cookies?.accessToken ||
      (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.replace("Bearer ", "")
        : null);

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;

    next();
  } catch (error) {
    next(new ApiError(401, error?.message || "Invalid access token"));
  }
};

export default verifyJWT;