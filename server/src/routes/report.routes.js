import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { 
    generateAndSaveReport, 
    getPastReports 
} from "../controllers/report.controller.js";

const router = Router();

// 🔒 Authentication zaroori hai
router.use(verifyJWT);

// Route: /api/v1/reports/generate
// Isse hit karte hi current month ki summary SQL mein save ho jayegi
router.route("/generate").post(generateAndSaveReport);

// Route: /api/v1/reports/history
// Isse pichle 3 months ki reports SQL se milengi (Point 45)
router.route("/history").get(getPastReports);

export default router;