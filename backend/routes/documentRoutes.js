const express = require('express');
const Document = require('../models/Document');

const router = express.Router();

// Create or update a document
router.post('/document', async (req, res) => {
    try {
        const { content } = req.body;
        const doc = await Document.create({ content });
        res.status(201).json(doc);
    } catch (error) {
        res.status(500).json({ message: 'Error creating document', error });
    }
});

module.exports = router;
