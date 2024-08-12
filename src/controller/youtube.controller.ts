import ytdl from "@distube/ytdl-core";
import { RequestHandler, response } from "express";

export const getYoutubeInfo: RequestHandler = (req, res, next) => {
  const videoId = req.params.id;
  // Get video info from YouTube
  ytdl.getInfo(videoId).then((info) => {
    if (info) res.status(200).json({ todos: info });
    else
      res
        .status(500)
        .json({ message: "Something went wrong. Try again later !!!" });
  });
};

export const getYoutubeVideos: RequestHandler = (req, res, next) => {
  const videoId = req.params.id;
  ytdl
    .getInfo(videoId)
    .then((info) => {
      if (info) {
        const videos = info.formats.filter(
          (item) =>
            item.hasOwnProperty("mimeType") &&
            item.mimeType?.includes("video/mp4") &&
            item.hasVideo &&
            item.hasAudio
        );
        res.status(200).json({ data: videos });
      } else res.status(200).json({ data: [] });
    })
    .catch((error) => {
      res.status(500).json({ message: error.msg });
    });
};
export const getYoutubeAudios: RequestHandler = (req, res, next) => {
  const videoId = req.params.id;
  ytdl
    .getInfo(videoId)
    .then((info) => {
      if (info) {
        const videos = info.formats.filter(
          (item) =>
            item.hasOwnProperty("mimeType") &&
            item.mimeType?.includes("audio/mp4") &&
            !item.hasVideo &&
            item.hasAudio
        );
        res.status(200).json({ data: videos });
      } else res.status(200).json({ data: [] });
    })
    .catch((error) => {
      res.status(500).json({ message: error.msg });
    });
};
