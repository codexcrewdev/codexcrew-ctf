import mongoose, { Schema, model, models } from "mongoose";

const SubmissionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    challengeId: { type: Schema.Types.ObjectId, ref: "Challenge", required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default models.Submission || model("Submission", SubmissionSchema);
