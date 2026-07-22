import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    originalFilename: {
      type: String,
      required: true,
      trim: true
    },
    storedFilename: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      required: true,
      enum: [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ],
    },
    fileSize: {
      type: Number,
      required: true
    },
    extractedText: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: [
        "uploaded",
        "extracted",
        "analyzing",
        "analyzed",
        "failed"
      ],
      default: "uploaded",
    },
    analysis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Analysis",
      default: null,
    },
  },
  {
    timestamps: true
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;