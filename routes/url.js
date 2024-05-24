const express = require("express");

const {creatingShortURL, handleGetAnalytics} = require("../controllers/url.js");

const router = express.Router();

router.post("/",creatingShortURL);

router.get("/analytics/:shortId",handleGetAnalytics);

module.exports= router;