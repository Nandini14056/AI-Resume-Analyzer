import Resume from "../models/Resume.model";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import { extractResumeText } from "../services/resumeParser.service";

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

export {
  uploadResume,
};