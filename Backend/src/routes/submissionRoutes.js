// routes/submissionRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { verifyToken, verifyRole } = require('../middleware/middleware');
const { submitFile, getAllSubmissions, editSubmission, getSubmissionById } = require('../controllers/submissionController');

// Submit file route
router.post('/submit', verifyToken, upload.single('image'), submitFile);

// Get all submissions
router.get('/', verifyToken, verifyRole(['Admin', 'Recruiter']), getAllSubmissions);

// Get a submission by ID
router.get('/:id', verifyToken, getSubmissionById);

// Edit submission (Admin/Recruiter only)
router.put('/:id', verifyToken, verifyRole(['Admin', 'Recruiter']), upload.single('image'), editSubmission);

module.exports = router;