import fs from "fs";
import * as pdfParse from "pdf-parse";
import mammoth from "mammoth";

const cleanText = (text) => {
  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const extractPdfText = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const data = await pdfParse(buffer);

  return cleanText(data.text);
};

const extractDocxText = async (filePath) => {
  const result = await mammoth.extractRawText({
    path: filePath,
  });

  return cleanText(result.value);
};

const extractResumeText = async (filePath, mimeType) => {
  switch (mimeType) {
    case "application/pdf":
      return await extractPdfText(filePath);

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return await extractDocxText(filePath);

    default:
      throw new Error("Unsupported file type");
  }
};

export {
  extractResumeText,
  extractPdfText,
  extractDocxText,
};