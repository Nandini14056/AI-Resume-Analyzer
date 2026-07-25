import { Router } from "express";
import { uploadResume, getResumeById, getUserResume, deleteResume } from "../controllers/resume.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/upload", upload.single("resume"), uploadResume);

router.get("/", getUserResume);
router.get("/:resumeId", getResumeById);
router.delete("/:resumeId", deleteResume);

export default router;