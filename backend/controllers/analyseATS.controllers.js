import { GoogleGenAI } from "@google/genai";
import { PDFParse } from "pdf-parse";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeResumeController = async (req, res) => {
  const token = req.cookies.token;

  const decoded = jwt.verify(token, process.env.SECREATE_KEY);
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Extract text from PDF
    const parser = new PDFParse(new Uint8Array(req.file.buffer));
    const pdfResult = await parser.getText();

    const resumeText =
      typeof pdfResult === "string"
        ? pdfResult
        : pdfResult.text || JSON.stringify(pdfResult);

    if (!resumeText || resumeText.trim() === "") {
      return res.status(400).json({
        message: "Could not extract resume text",
      });
    }

    // Gemini ATS Analysis
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `
You are an ATS Resume Analyzer.

Analyze the following resume.

Return ONLY a number between 0 and 100.

Resume:
${resumeText}
`,
    });

    const text = response.text?.trim() || "";

    const match = text.match(/\d+/);

    if (!match) {
      return res.status(500).json({
        message: "Invalid AI response",
        response: text,
      });
    }

    const score = Math.min(Math.max(Number(match[0]), 0), 100);

    // Update user's atsScore and resume in the database

    await User.findByIdAndUpdate(decoded._id, {
      atsScore: score,
      analyzedAt: new Date(),
    });

    return res.status(200).json({
      score,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message || "Failed to analyze resume",
    });
  }
};

export default analyzeResumeController;
