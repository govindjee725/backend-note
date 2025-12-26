import express from "express";
import upload from "../middleware/upload.js";
import { uploadPyq, getPyqs } from "../controllers/pyqController.js";

const router = express.Router();

router.post("/", upload.single("pdf"), uploadPyq);
router.get("/", getPyqs);

export default router;
