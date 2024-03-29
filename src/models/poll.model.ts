import mongoose from "mongoose";

interface IPoll {
  question: string;
  options: string[];
  votes: number[];
  endsAt?: Date;
}

const pollSchema = new mongoose.Schema<IPoll>(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    votes: { type: [Number], required: true },
    endsAt: { type: Date },
  },
  { timestamps: true }
);

const Poll = mongoose.model<IPoll>("Poll", pollSchema);
export default Poll;
