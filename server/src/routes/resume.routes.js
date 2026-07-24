import { Router } from "express";
import { uploadResume, getResumeById, getUserResume, deleteResume } from "../controllers/resume.controller";
import verifyJWT from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";

const router = Router();

router.use(verifyJWT);

router.post("/upload", upload.single("resume"), uploadResume);

router.get("/", getUserResume);
router.get("/:resumeId", getResumeById);
router.delete("/:resumeId", deleteResume);

export default router;