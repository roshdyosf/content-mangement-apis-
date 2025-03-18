const getAllVideosForSectionService = require('../services/video/getAllVideosForSectionService');
const createVideoService = require('../services/video/createVideoService');
const updateVideoService = require('../services/video/updateVideoService');
const deleteVideoService = require('../services/video/deleteVideoService');
const getSingleVideoService = require('../services/video/getSingleVideoService')
const handleResponse = require('../utils/errorHandler');

const createVideo = async (req, res) => {
    const videoData = req.body;
    const result = await createVideoService(videoData, req.file.path);
    handleResponse(res, result);
};

const getVideos = async (req, res) => {
    const sectionId = req.params.sectionId;
    const result = await getAllVideosForSectionService(sectionId);
    handleResponse(res, result);
};

const getSingleVideo = async (req, res) => {
    const videoId = req.params.videoId;
    const result = await getSingleVideoService(videoId);
    handleResponse(res, result);
};

const updateVideoInfo = async (req, res) => {
    const videoData = req.body;
    const videoId = req.body.videoId;
    const result = await updateVideoService(videoId, videoData);
    handleResponse(res, result);
};

const deleteVideo = async (req, res) => {
    const videoId = req.params.videoId;
    const result = await deleteVideoService(videoId);
    handleResponse(res, result);
};

module.exports = {
    getVideos,
    createVideo,
    updateVideoInfo,
    deleteVideo,
    getSingleVideo
};
