import mongoose, { mongo } from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true
    },
    atsScore: {
      type: Number,
      require: true,
      min: 0,
      max: 100
    },
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    strengths: [
      {
        type: String
      }
    ],
    weakness: [
      {
        type: String
      }
    ],
    technicalSkills: [
      {
        type: String
      }
    ],
    missingSkills: [
      {
        type: String
      }
    ],
    missingSkills: [
      {
        type: String,
      },
    ],
    experienceFeedback: [
      {
        type: String,
      },
    ],

    educationFeedback: [
      {
        type: String,
      },
    ],
    recommendation: [
      {
        type: String
      }
    ],
    recommendedRoles: [
      {
        type: String
      }
    ],
    rawResponse: {
      type: Object
    }
  },
  {
    timestamps: true
  }
);

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;