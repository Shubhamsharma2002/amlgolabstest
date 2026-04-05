import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { getDashboardData, getSmartSuggestions } from "../controllers/dashboard.controller.js";

const router = Router();
router.use(verifyJWT); // Sirf login user dekh sake 

router.route("/stats").get(getDashboardData);
router.get('/analyze', getSmartSuggestions);
export default router;