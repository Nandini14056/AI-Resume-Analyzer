import { Router } from "express";

import { analyseResume, getAnalysisById, getMyAnalysis, deleteAnalysis } from "../controllers/analysis.controller";
import verifyJWT from "../middleware/auth.middleware";

const router = Router();

router.use(verifyJWT);

router.post("/:resumeId", analyseResume);

router.get("/", getMyAnalysis);

router.get("/:analysisId", getAnalysisById);
router.delete("/delete/:analysisId", deleteAnalysis);

export default router;