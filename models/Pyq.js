import mongoose from "mongoose";

const pyqSchema = new mongoose.Schema(
  {
    subject: String,
    year: String,
    pdfUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("Pyq", pyqSchema);
