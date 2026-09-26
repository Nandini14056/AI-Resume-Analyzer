import Analysis from "../models/Analysis.model.js";
import Resume from "../models/Resume.model.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

import { analyzeResumeWithAI } from "../services/groq.service.js";

const analyzeResume = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;

  if (!resumeId) {
    throw new ApiError(400, "Resume ID is required");
  }

  const resume = await Resume.findOne({
    _id: resumeId,
    user: req.user._id
  });

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  if (!resume.extractedText) {
    throw new ApiError(400, "Resume text has not been extracted yet");
  }

  if (resume.status === "analyzing") {
    throw new ApiError(400, "Resume is already being analyzed");
  }

  if (resume.status === "analyzed") {
    throw new ApiError(400, "Resume has already been analyzed");
  }

  resume.status = "analyzing";
  await resume.save();

  try {
    const analysisData = await analyzeResumeWithAI(
      resume.extractedText
    );

    const analysis = await Analysis.create({
      user: req.user._id,
      resume: resume._id,
      ...analysisData,
      rawResponse: analysisData,
    });

    resume.analysis = analysis._id;
    resume.status = "analyzed";

    await resume.save();

    return res.status(201).json(
    new ApiResponse(
      201,
      {
        analysis,
      },
      "Resume analyzed successfully"
    )
  );
  } catch (error) {
    console.error("========== RESUME ANALYSIS ERROR ==========");
    console.error(error);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("============================================");

    return res.status(500).json({
        success: false,
        message: error.message || "Failed to analyze resume"
    });
}

  
});

const getAnalysisById = asyncHandler(async (req, res) => {
  const { analysisId } = req.params;

  if (!analysisId) {
    throw new ApiError(400, "Analysis ID is required");
  }

  const analysis = await Analysis.findOne({
    _id: analysisId,
    user: req.user._id,
  }).populate("resume");

  if (!analysis) {
    throw new ApiError(404, "Analysis not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      analysis,
      "Analysis fetched successfully"
    )
  )
});

const getMyAnalysis = asyncHandler(async (req, res) => {
  const analysis = await Analysis.find({
    user: req.user._id
  }).populate("resume").sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      analysis,
      "Analysis fetched successfully"
    )
  );
});

const deleteAnalysis = asyncHandler(async (req, res) => {
  const { analysisId } = req.params;

  const analysis = await Analysis.findOne({
    _id: analysisId,
    user: req.user._id,
  });

  if (!analysis) {
    throw new ApiError(404, "Analysis not found");
  }

  await analysis.deleteOne();

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Analysis deleted successfully"
    )
  );
});

export {
  analyzeResume,
  getAnalysisById,
  getMyAnalysis,
  deleteAnalysis
};