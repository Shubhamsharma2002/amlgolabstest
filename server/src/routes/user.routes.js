import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import { getAdminDashboard, loginUser, logoutUser, registerUser, forgotPasswordReset } from "../controllers/user.controller.js";


const router = Router();
console.log("Route registerUser:", registerUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//  protected route
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/forgot-password").post(forgotPasswordReset);
router.route("/admin/dashboard").get(verifyJWT, getAdminDashboard);

export default router;