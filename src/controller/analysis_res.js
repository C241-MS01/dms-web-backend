const prisma = require('../prisma');

const getAnalysisResults = async (req, res) => {
    const analysisResults = await prisma.analysis_result.findMany();
    res.status(200).json({
      message: "success getAllAnalysis",
      data: analysisResults
    });
  };
  
  const getAnalysisResultById = async (req, res) => {
    const { id } = req.params;
    const analysisResult = await prisma.analysis_result.findUnique({ where: { id: parseInt(id) } });
    if (!analysisResult) return res.status(404).json({ error: 'Analysis Result not found' });
    res.status(200).json({
      message: "success getAnalysisById",
      data: analysisResult
    });
  };
  
  // const createAnalysisResult = async (req, res) => {
  //   const analysisResult = await prisma.analysis_result.create({ data: req.body });
  //   res.status(201).json({
  //     message: "success create analysis",
  //     data: analysisResult
  //   });
  // };
  
  // const updateAnalysisResult = async (req, res) => {
  //   const { id } = req.params;
  //   const analysisResult = await prisma.analysis_result.update({ where: { id: parseInt(id) }, data: req.body });
  //   res.status(200).json({
  //     message: "success updateAnalysis",
  //     data: analysisResult
  //   });
  // };
  
  // const deleteAnalysisResult = async (req, res) => {
  //   const { id } = req.params;
  //   await prisma.analysis_result.delete({ where: { id: parseInt(id) } });
  //   res.status(204).send();
  // };
  
  module.exports = { getAnalysisResults, getAnalysisResultById};