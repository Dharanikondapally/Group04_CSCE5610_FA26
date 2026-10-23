
"use strict";

// CSCE 5610 - Computer Architecture
// Group 4
// FIFO vs LRU Page Replacement Algorithms
// Documented Test Runner

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// Import the simulator implementation.
// Assumes engine.js is in the main project folder.
const engine = require("../engine.js");

// Adjust this adapter to match the exported
// function names in your engine.js.
function runAlgorithm(pages, frames, policy) {
  if (typeof engine.simulate === "function") {
    return engine.simulate(pages, frames, policy);
  }

  throw new Error(
    "engine.js must export a simulate(pages, frames, policy) function."
  );
}

// Test cases and expected results
const testCases = [
  {
    name: "Standard Reference String",
    pages: [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2],
    frames: 3,
    expectedFIFO: 10,
    expectedLRU: 9
  },
  {
    name: "Belady Anomaly - 3 Frames",
    pages: [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5],
    frames: 3,
    expectedFIFO: 9,
    expectedLRU: 10
  },
  {
    name: "Belady Anomaly - 4 Frames",
    pages: [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5],
    frames: 4,
    expectedFIFO: 10,
    expectedLRU: 8
  },
  {
    name: "Repeated Page Accesses",
    pages: [5, 5, 5, 5],
    frames: 3,
    expectedFIFO: 1,
    expectedLRU: 1
  },
  {
    name: "Single Memory Frame",
    pages: [1, 2, 1],
    frames: 1,
    expectedFIFO: 3,
    expectedLRU: 3
  }
];

function verifyResult(result, pages, frames, expectedFaults) {
  assert.equal(result.faults, expectedFaults);

  assert.equal(
    result.hits + result.faults,
    pages.length,
    "Hits and faults must equal total references"
  );

  assert.ok(
    Array.isArray(result.history),
    "The simulator must return a history array"
  );

  assert.equal(
    result.history.length,
    pages.length,
    "Every request must have a trace entry"
  );

  for (const state of result.history) {
    const resident = state.frames.filter(page => page !== null);

    assert.ok(
      resident.length <= frames,
      "Resident pages exceed frame capacity"
    );

    assert.equal(
      new Set(resident).size,
      resident.length,
      "Duplicate pages detected in memory"
    );

    assert.equal(
      state.hits + state.faults,
      state.step,
      "Incorrect cumulative hit/fault count"
    );
  }
}

function executeTests() {
  console.log("\n==========================================");
  console.log(" CSCE 5610 - FIFO vs LRU TEST RUNNER");
  console.log("==========================================\n");

  const results = [];
  let passed = 0;

  for (const test of testCases) {
    let status = "PASS";
    let errorMessage = null;
    let fifo = null;
    let lru = null;

    console.log(`Running: ${test.name}`);

    try {
      fifo = runAlgorithm(test.pages, test.frames, "FIFO");
      lru = runAlgorithm(test.pages, test.frames, "LRU");

      verifyResult(
        fifo,
        test.pages,
        test.frames,
        test.expectedFIFO
      );

      verifyResult(
        lru,
        test.pages,
        test.frames,
        test.expectedLRU
      );

      passed++;

    } catch (error) {
      status = "FAIL";
      errorMessage = error.message;
    }

    console.log(`  Frames: ${test.frames}`);
    console.log(`  Expected FIFO: ${test.expectedFIFO}`);
    console.log(`  Actual FIFO: ${fifo?.faults ?? "N/A"}`);
    console.log(`  Expected LRU: ${test.expectedLRU}`);
    console.log(`  Actual LRU: ${lru?.faults ?? "N/A"}`);
    console.log(`  Result: ${status}`);

    if (errorMessage) {
      console.log(`  Error: ${errorMessage}`);
    }

    console.log("------------------------------------------");

    results.push({
      name: test.name,
      pages: test.pages,
      frames: test.frames,
      expectedFIFO: test.expectedFIFO,
      actualFIFO: fifo?.faults ?? null,
      expectedLRU: test.expectedLRU,
      actualLRU: lru?.faults ?? null,
      status,
      error: errorMessage
    });
  }

  const output = {
    project:
      "Comparative Analysis of FIFO and LRU Page Replacement Algorithms in Virtual Memory",
    totalTests: testCases.length,
    passed,
    failed: testCases.length - passed,
    results
  };

  const outputPath = path.join(__dirname, "test_results.json");

  fs.writeFileSync(
    outputPath,
    JSON.stringify(output, null, 2),
    "utf8"
  );

  console.log("\n==========================================");
  console.log(`TEST SUMMARY: ${passed}/${testCases.length} PASSED`);
  console.log("==========================================");
  console.log(`Results saved to: ${outputPath}\n`);

  if (passed !== testCases.length) {
    process.exitCode = 1;
  }
}

executeTests();
