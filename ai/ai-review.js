import { execSync } from "child_process";
import fs from "fs";
import { getAllJSFiles } from "./file-utils.js";

function analyzeWithOllama(prompt) {
  return execSync(`echo "${prompt}" | ollama run codellama`, {
    encoding: "utf8",
  });
}

function analyzeFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8");

  const prompt = `
  Analyze this JavaScript code for bugs, improvements, and security issues.
  Provide fixes with explanations.

  Code:
  ${code}
  `;

  const result = analyzeWithOllama(prompt);

  console.log(`\n=== Analysis for ${filePath} ===\n`);
  console.log(result);
}

const files = getAllJSFiles("./src");
files.forEach((file) => analyzeFile(file));
