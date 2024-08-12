import { Router } from "express";
import {
  getYoutubeAudios,
  getYoutubeInfo,
  getYoutubeVideos,
} from "../controller/youtube.controller";

// Old node way
// const express = require('express');
// const Router = express.Router;

const router = Router();

router.get("/info/:id", getYoutubeInfo);
router.get("/videos/:id", getYoutubeVideos);
router.get("/audios/:id", getYoutubeAudios);

export default router;
