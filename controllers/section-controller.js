const createSectionService = require('../services/section/createSectionService');
const updateSectionService = require('../services/section/updateSectionService');
const deleteSectionService = require('../services/section/deleteSectionService');
const getAllSections = require('../services/section/getAllSectionsService')

const handleResponse = require('../utils/errorHandler');
const getSectionByIdService = require('../services/section/getSectionByIdServicec');


const getSections = async (req, res) => {
    const courseId = req.params.courseId;
    const result = await getAllSections(courseId);
    handleResponse(res, result);
};

const createSection = async (req, res) => {
    const educatorId = req.userInfo.userId || req.userInfo.id
    const sectionData = req.body;
    const result = await createSectionService(sectionData, educatorId);
    handleResponse(res, result);
};

const updateSectionInfo = async (req, res) => {
    const sectionId = req.body.sectionId;
    const sectionData = req.body;
    const courseId = req.body.courseId;
    const result = await updateSectionService(sectionId, sectionData, courseId);
    handleResponse(res, result);
};

const deleteSection = async (req, res) => {
    const sectionId = req.params.sectionId;
    const courseId = req.body.courseId;
    const result = await deleteSectionService(sectionId, courseId);
    handleResponse(res, result);
};
const getSectionById = async (req, res) => {
    const sectionId = req.params.sectionId;
    const result = await getSectionByIdService(sectionId);
    handleResponse(res, result);
};
module.exports = {
    getSections,
    createSection,
    updateSectionInfo,
    deleteSection,
    getSectionById
};