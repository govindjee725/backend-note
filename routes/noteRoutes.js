import express from "express";
import upload from "../middleware/upload.js";
import { uploadNote, getNotes } from "../controllers/noteController.js";

const router = express.Router();

router.post("/", upload.single("pdf"), uploadNote);
router.get("/", getNotes);

export default router;
