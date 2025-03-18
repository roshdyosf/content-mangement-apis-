const createSectionService = require('../services/section/createSectionService');
const updateSectionService = require('../services/section/updateSectionService');
const deleteSectionService = require('../services/section/deleteSectionService');
const getAllSections = require('../services/section/getAllSectionsService')

const handleResponse = require('../utils/errorHandler');


const getSections = async (req, res) => {
    const courseId = req.params.courseId;
    const result = await getAllSections(courseId);
    handleResponse(res, result);
};

const createSection = async (req, res) => {
    const sectionData = req.body;
    const result = await createSectionService(sectionData);
    handleResponse(res, result);
};

const updateSectionInfo = async (req, res) => {
    const sectionId = req.body.sectionId;
    const sectionData = req.body;
    const result = await updateSectionService(sectionId, sectionData);
    handleResponse(res, result);
};

const deleteSection = async (req, res) => {
    const sectionId = req.params.sectionId;
    const result = await deleteSectionService(sectionId);
    handleResponse(res, result);
};

module.exports = {
    getSections,
    createSection,
    updateSectionInfo,
    deleteSection,
};