const fs = require("fs");

// Read input file
const input = fs.readFileSync("input.txt", "utf8").trim();

// Split into lines
const reports = input.split("\n");

function isSafe(report) {
  const levels = report.split(" ").map(Number);

  // Determine direction
  const firstDiff = levels[1] - levels[0];

  // If first difference is 0 or invalid jump, immediately unsafe
  if (firstDiff === 0 || Math.abs(firstDiff) > 3) {
    return false;
  }

  const isIncreasing = firstDiff > 0;

  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];

    // Rule 1: Must not be 0
    if (diff === 0) return false;

    // Rule 2: Difference must be between 1 and 3 inclusive
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;

    // Rule 3: Direction must stay consistent
    if (isIncreasing && diff < 0) return false;
    if (!isIncreasing && diff > 0) return false;
  }

  return true;
}

// Count safe reports
let safeCount = 0;

for (const report of reports) {
  if (isSafe(report)) {
    safeCount++;
  }
}

console.log("Safe reports:", safeCount);