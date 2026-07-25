import Resume from "../models/Resume.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { extractResumeText } from "../services/resumeParser.service.js";

const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Resume is required");
  }

  const resume = await Resume.create({
    user: req.user._id,

    originalFilename: req.file.originalname,
    storedFilename: req.file.filename,
    fileType: req.file.mimetype,
    fileSize: req.file.size,
  });

  const extractedText = await extractResumeText(
    req.file.path,
    req.file.mimetype
  );

  resume.extractedText = extractedText;
  resume.status = "extracted";

  await resume.save();

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        resume
      },
      "Resume uploaded successfully"
    )
  );
});

const getResumeById = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;

  if (!resumeId) {
    throw new ApiError(400, "resume id is required");
  }

  const resume = await Resume.findOne({
    _id: resumeId,
    user: req.user._id,
  });

  if (!resume) {
    throw new ApiError(400, "No resume found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      resume,
      "Resume fetched successfully"
    )
  );
});

const getUserResume = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({
    user: req.user._id
  }).populate("analysis").sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      resumes,
      "Resumed fetched successfully"
    )
  );
});

const deleteResume = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;

  const resume = await Resume.findOne({
    _id: resumeId,
    user: req.user._id
  });

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }
  await resume.deleteOne();

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Resume deleted successfully"
    )
  );
});

export {
  uploadResume,
  getResumeById,
  getUserResume,
  deleteResume
};