import { Router } from "express";

import { analyseResume } from "../controllers/analysis.controller";
import verifyJWT from "../middleware/auth.middleware";

const router = Router();

router.use(verifyJWT);

router.post("/:resumeId", analyseResume);