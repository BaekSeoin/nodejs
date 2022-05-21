const express = require("express");
const router = express.Router();

const apiRouter = require('./apiRouter');
const authRouter = require('./authRouter');
const authMiddleWare = require('../middleWare/authMiddleWare')

router.use('/api', authMiddleWare, apiRouter);
router.use('/auth', authRouter);

module.exports = router;