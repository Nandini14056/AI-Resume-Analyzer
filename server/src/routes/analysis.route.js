import { Router } from "express";

import { analyzeResume, getAnalysisById, getMyAnalysis, deleteAnalysis } from "../controllers/analysis.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/:resumeId", analyzeResume);

router.get("/", getMyAnalysis);

router.get("/:analysisId", getAnalysisById);
router.delete("/delete/:analysisId", deleteAnalysis);

export default router;