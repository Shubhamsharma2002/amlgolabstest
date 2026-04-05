import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import {  deleteUser, getAdminDashboardData } from "../controllers/admin.controller.js";

const router = Router();

// Sabhi routes protected hain
router.use(verifyJWT, isAdmin);

router.route("/stats").get(getAdminDashboardData);
router.route("/user/:id").delete(deleteUser);

export default router;