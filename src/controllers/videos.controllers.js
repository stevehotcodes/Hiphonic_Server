import { sendBadRequest, sendCreated, sendNotFound, sendServerError } from "../helpers/helper.function.js";
import { fetchVideoService, uploadVideoService } from "../services/videoServices.js";

export const uploadVideo = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const videoDetails = {
      video_description: req.body.video_description,
      video_url: req.body.video_url,
      user_id: user_id,
    };

    const result = await uploadVideoService(videoDetails);

    if (result.rowsAffected > 0) {
      sendCreated(res, 'Video uploaded successfully');
    } else {
      sendBadRequest(res, 'Error in uploading the video');
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const fetchVideo = async (req, res) => {
  try {
    const videos = await fetchVideoService();

    if (videos.length === 0) {
      sendNotFound(res, 'No videos found');
    } else {
      return res.status(200).json(videos);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
