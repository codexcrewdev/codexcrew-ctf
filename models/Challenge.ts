import mongoose, { Schema, model, models } from "mongoose";

export interface IChallenge {
  title: string;
  description: string;
  flagHash: string;
  points: number;
  isActive: boolean;
}

const ChallengeSchema = new Schema<IChallenge>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    flagHash: { type: String, required: true },
    points: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.Challenge || model<IChallenge>("Challenge", ChallengeSchema);
