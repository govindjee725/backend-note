import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    subject: String,
    unit: String,
    pdfUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
