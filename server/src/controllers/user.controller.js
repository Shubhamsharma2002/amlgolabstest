
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//  Register
// const registerUser = async (req, res, next) => {
//   try {
//     const { fullname, email, password } = req.body;

//     // validation
//     if (!fullname || !email || !password) {
//       throw new ApiError(400, "All fields are required");
//     }

//     // check existing user
//     const existedUser = await User.findOne({ email });

//     if (existedUser) {
//       throw new ApiError(400, "User already exists");
//     }

//     // create user
//     const user = await User.create({
//       fullname,
//       email,
//       password,
//     });

//     const createdUser = await User.findById(user._id).select("-password -refreshToken");

//     return res
//       .status(201)
//       .json(new ApiResponse(201, createdUser, "User registered successfully"));
//   } catch (error) {
//     next(error);
//   }
// };
const registerUser = async (req, res, next) => {
  try {
    // 1. Yahan 'role' ko bhi extract karo
    const { fullname, email, password, role } = req.body; 

    if (!fullname || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw new ApiError(400, "User already exists");
    }

    // 2. User create karte waqt 'role' pass karo
    const user = await User.create({
      fullname,
      email,
      password,
      role: role || "user", // Agar role nahi bheja toh default 'user'
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  } catch (error) {
    next(error);
  }
};
console.log(typeof registerUser);

//  Login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    //  generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // cookie options
    const options = {
      httpOnly: true,
      secure: false, // production me true
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, {
          user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
          },
          accessToken,
        }, "Login successful")
      );

  } catch (error) {
    next(error);
  }
};



//  Logout
const logoutUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );

    return res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json(new ApiResponse(200, {}, "Logged out successfully"));

  } catch (error) {
    next(error);
  }
};
// Password Reset Logic
const forgotPasswordReset = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      throw new ApiError(400, "Email and New Password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User with this email does not exist");
    }

    // Naya password set karo
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password reset successfully. Now you can login!"));
  } catch (error) {
    next(error);
  }
};

// Admin Feature: See all users' total spending 
const getAdminDashboard = async (req, res, next) => {
  try {
    // Check if user is admin (Aapne User model me role: "admin" rakha hona chahiye) 
    if (req.user.role !== "admin") {
      throw new ApiError(403, "You do not have permission to view this data");
    }

    // Har user ka total spending nikalne ke liye aggregation
    const usersSpending = await User.aggregate([
      {
        $lookup: {
          from: "expenses", 
          localField: "_id",
          foreignField: "owner",
          as: "expenses",
        },
      },
      {
        $project: {
          fullname: 1,
          email: 1,
          totalSpent: { $sum: "$expenses.amount" },
        },
      },
    ]);

    return res
      .status(200)
      .json(new ApiResponse(200, usersSpending, "Admin data fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  forgotPasswordReset, 
  getAdminDashboard 
};