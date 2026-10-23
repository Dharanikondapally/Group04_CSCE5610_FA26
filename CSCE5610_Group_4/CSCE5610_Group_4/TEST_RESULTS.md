# FIFO and LRU Page Replacement Algorithms — Test Results

**Course:** CSCE 5610 – Computer Architecture  
**Project:** Comparative Analysis of FIFO and LRU Page Replacement Algorithms in Virtual Memory  
**Group:** 4  
**University:** University of North Texas  
**Semester:** Fall 2026

## 1. Testing Objective

The purpose of testing is to verify that the FIFO (First-In, First-Out) and LRU (Least Recently Used) page replacement algorithms correctly process page-reference strings under different memory-frame configurations.

The tests evaluate page faults, page hits, replacement decisions, and memory-frame behavior. Both algorithms are tested using identical input conditions to ensure a fair comparison.

## 2. Test Environment

- Programming Language: JavaScript
- Platform: Web Browser and Node.js
- Test Framework: Node.js built-in assertion functionality
- Input: Page-reference strings and memory-frame counts
- Algorithms: FIFO and LRU
- Test Execution: `node tests/run_documented_tests.js`

## 3. Test Cases and Results

| Test Case | Frames | Expected FIFO Faults | Actual FIFO Faults | Expected LRU Faults | Actual LRU Faults | Status |
|---|---|---|---|---|---|---|
| Standard Reference String | 3 | 10 | 10 | 9 | 9 | PASS |
| Belady's Anomaly Test | 3 | 9 | 9 | 10 | 10 | PASS |
| Belady's Anomaly Test | 4 | 10 | 10 | 8 | 8 | PASS |
| Repeated Page Accesses | 3 | 1 | 1 | 1 | 1 | PASS |
| Single Memory Frame | 1 | 3 | 3 | 3 | 3 | PASS |

**Overall Result: 5 out of 5 tests passed.**

## 4. Detailed Test Cases

### Test 1: Standard Reference String

**Input:**
- Page Reference String: `7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2`
- Number of Frames: 3

**Results:**
- FIFO Page Faults: 10
- FIFO Page Hits: 3
- LRU Page Faults: 9
- LRU Page Hits: 4

**Status:** PASS

**Observation:** LRU produced one fewer page fault than FIFO for this workload.

### Test 2: Belady's Anomaly — 3 Frames

**Input:**
- Page Reference String: `1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5`
- Number of Frames: 3

**Results:**
- FIFO Page Faults: 9
- LRU Page Faults: 10

**Status:** PASS

### Test 3: Belady's Anomaly — 4 Frames

**Input:**
- Page Reference String: `1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5`
- Number of Frames: 4

**Results:**
- FIFO Page Faults: 10
- LRU Page Faults: 8

**Status:** PASS

**Observation:** Increasing memory frames from 3 to 4 increased FIFO page faults from 9 to 10. This demonstrates Belady's anomaly. LRU faults decreased from 10 to 8.

### Test 4: Repeated Page Accesses

**Input:**
- Page Reference String: `5, 5, 5, 5`
- Number of Frames: 3

**Results:**
- FIFO Page Faults: 1
- LRU Page Faults: 1
- FIFO Page Hits: 3
- LRU Page Hits: 3

**Status:** PASS

**Observation:** The first request causes a page fault, while subsequent requests are page hits.

### Test 5: Single Memory Frame

**Input:**
- Page Reference String: `1, 2, 1`
- Number of Frames: 1

**Results:**
- FIFO Page Faults: 3
- LRU Page Faults: 3

**Status:** PASS

**Observation:** With only one available memory frame, each request replaces the previous page, resulting in three page faults for both algorithms.

## 5. Validation Checks

The simulator verifies the following conditions:

1. Page Hits + Page Faults = Total Page References.
2. The number of resident pages never exceeds the configured frame count.
3. No duplicate pages exist in physical memory frames.
4. FIFO maintains its page-arrival order.
5. LRU updates page recency after page accesses.

These checks help verify the correctness of the simulator's memory-management operations.

## 6. Test Execution Instructions

To execute the documented tests:

1. Download or clone the project repository.
2. Open a terminal in the project directory.
3. Execute the following command:

```bash
node tests/run_documented_tests.js
```

4. Review the PASS/FAIL results in the terminal.



## 7. Test Evidence

The test execution results are also recorded in:

- `tests/test_results.json` — Structured test execution results.
- `tests/run_documented_tests.js` — Executable documented tests.
- `tests/test_engine.js` — Additional simulator tests.

A screenshot of the browser-based test results can be added as supporting evidence:

`test_results.png`

## 8. Conclusion

The five documented test cases produced the expected page-fault counts for both FIFO and LRU.

The tests cover standard page replacement behavior, repeated references, single-frame execution, and Belady's anomaly.

These results demonstrate that the tested simulator implementation correctly performs FIFO and LRU page replacement for the selected workloads and satisfies the tested memory-state consistency conditions.
