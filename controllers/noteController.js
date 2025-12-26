import fs from "fs";
import imagekit from "../config/imagekit.js";
import Note from "../models/Note.js";

// Upload Notes PDF
export const uploadNote = async (req, res) => {
  try {
    const { subject, unit } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "PDF file required" });
    }

    const file = fs.readFileSync(req.file.path);

    const uploaded = await imagekit.upload({
      file,
      fileName: `${subject}_${unit}.pdf`,
      folder: "/notes",
    });

    fs.unlinkSync(req.file.path);

    const note = await Note.create({
      subject,
      unit,
      pdfUrl: uploaded.url,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET ALL NOTES (THIS WAS MISSING)
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
