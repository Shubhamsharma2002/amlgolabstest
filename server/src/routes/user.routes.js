import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";


const router = Router();
console.log("Route registerUser:", registerUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//  protected route
router.route("/logout").post(verifyJWT, logoutUser);

export default router;