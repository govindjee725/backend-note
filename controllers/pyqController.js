import fs from "fs";
import imagekit from "../config/imagekit.js";
import Pyq from "../models/Pyq.js";

// Upload PYQ PDF
export const uploadPyq = async (req, res) => {
  try {
    const { subject, year } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "PDF file required" });
    }

    const file = fs.readFileSync(req.file.path);

    const uploaded = await imagekit.upload({
      file,
      fileName: `${subject}_${year}.pdf`,
      folder: "/pyqs",
    });

    fs.unlinkSync(req.file.path);

    const pyq = await Pyq.create({
      subject,
      year,
      pdfUrl: uploaded.url,
    });

    res.status(201).json(pyq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL PYQs (THIS WAS MISSING / WRONG)
export const getPyqs = async (req, res) => {
  try {
    const pyqs = await Pyq.find().sort({ createdAt: -1 });
    res.status(200).json(pyqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
