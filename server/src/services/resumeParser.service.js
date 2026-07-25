import fs from "fs";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const cleanText = (text) => {
  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const extractPdfText = async (filePath) => {
  const data = new Uint8Array(fs.readFileSync(filePath));

  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let text = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);

    const content = await page.getTextContent();

    text +=
      content.items
        .map((item) => item.str)
        .join(" ") + "\n";
  }

  return cleanText(text);
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
      return extractPdfText(filePath);

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return extractDocxText(filePath);

    default:
      throw new Error("Unsupported file type");
  }
};

export {
  extractResumeText,
  extractPdfText,
  extractDocxText,
};