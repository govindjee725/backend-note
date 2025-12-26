import multer from "multer";

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDFs allowed"), false);
  }
};

export default multer({ storage, fileFilter });
