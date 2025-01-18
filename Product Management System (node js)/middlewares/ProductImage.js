const multer = require('multer');
const path = require('path');

// Configure Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set upload folder
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        // Rename the uploaded file to avoid name collisions
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

// File Filter to allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

// Initialize Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: fileFilter,
});

module.exports = upload;