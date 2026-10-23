# Comparative Analysis of FIFO and LRU Page Replacement Algorithms in Virtual Memory

**CSCE 5610 – Computer Architecture | Fall 2026**

**University of North Texas | Group 4**

## Team Members

| Name | Student ID | Project Responsibility |
|---|---|---|
| Ruchitha Sri Sai Valli Thanmayee Potladurthy | 11855553 | Simulator Integration and Performance Analysis |
| Adla Sanjay Ramaswamy | 11828288 | LRU Implementation and Analysis |
| Dharani Kondapally | 11853256 | FIFO Implementation and Validation |

## 1. Project Overview

This project focuses on the comparative analysis of two widely used page replacement algorithms in virtual memory management: First-In, First-Out (FIFO) and Least Recently Used (LRU).

Virtual memory allows computer systems to manage memory efficiently by maintaining a mapping between virtual pages and physical memory frames. When a requested page is not available in physical memory, a page fault occurs. If all allocated memory frames are occupied, the operating system must select a page to replace.

Our project demonstrates how FIFO and LRU make different replacement decisions and how these decisions affect memory performance.

We developed an interactive web-based simulator that allows users to visualize page replacement operations, modify memory configurations, and compare the performance of both algorithms using dynamically generated results.

## 2. Project Objective

The primary objective is to implement and compare FIFO and LRU page replacement algorithms under identical experimental conditions.

The simulator is designed to:

- Process the same page-reference strings using both algorithms.
- Evaluate different memory-frame configurations.
- Calculate page hits, page faults, hit ratios, and fault rates.
- Display step-by-step changes in memory-frame states.
- Visualize the replacement decisions of FIFO and LRU.
- Compare performance using interactive graphs and tables.
- Verify algorithm correctness using reproducible test cases.

### Research Question

**How do FIFO and LRU differ in page-fault and page-hit performance when processing identical page-reference workloads under different memory-frame constraints?**

## 3. Computer Architecture Concepts

The project focuses on virtual memory and memory management in computer architecture.

### Virtual Memory

Virtual memory provides a mechanism for managing memory using virtual page addresses and physical memory frames.

### Page Fault

A page fault occurs when a requested page is not currently resident in the allocated physical memory frames.

### Page Hit

A page hit occurs when the requested page is already present in memory.

### Page Replacement

When a page fault occurs and all allocated frames are occupied, the simulator uses FIFO or LRU to select a page for replacement.

## 4. Page Replacement Algorithms

### FIFO — First-In, First-Out

FIFO replaces the page that has been present in memory for the longest time.

The algorithm maintains the arrival order of pages loaded into physical memory.

**Working Process:**

1. Check whether the requested page is already present.
2. If present, record a page hit.
3. If absent, record a page fault.
4. If an empty frame exists, load the requested page.
5. If all frames are occupied, remove the oldest loaded page.
6. Update the memory-frame state and performance metrics.

FIFO does not update arrival order when a page is accessed again.

### LRU — Least Recently Used

LRU replaces the page that has not been accessed for the longest period.

The algorithm tracks the order of recent page accesses.

**Working Process:**

1. Check whether the requested page is present in memory.
2. If present, record a page hit and update its recency.
3. If absent, record a page fault.
4. If a free frame is available, load the requested page.
5. If memory is full, replace the least recently used page.
6. Update the memory-frame state and performance metrics.

## 5. Interactive Simulator Features

The project includes a web-based interface for demonstrating FIFO and LRU page replacement operations.

### Live Page Replacement Simulation

Users can enter custom page-reference strings and select the number of available memory frames.

The simulator automatically recalculates both algorithms when the inputs change.

### Step-by-Step Execution

Users can examine each memory access using:

- Play and pause controls
- Previous and next step buttons
- Interactive execution slider
- Clickable page-reference timeline

### Physical Memory Visualization

Memory frames are displayed visually for both algorithms.

The simulator highlights page hits, new page loads, and replacements.

### Memory-State Heatmaps

Interactive heatmaps represent memory-frame contents across successive page requests.

Each row corresponds to a physical memory frame, and each column represents a page-reference step.

### Architecture Visualization

The website includes a conceptual memory-management workflow with:

- CPU page requests
- Residency lookup
- Page-hit and page-fault detection
- FIFO and LRU replacement decisions
- Physical memory-frame updates

The architecture monitor displays educational representations of page-request registers, residency bits, page-fault signals, frame capacity, replacement enable signals, and memory-frame indices.

### Performance Visualization

Interactive charts allow users to compare:

- FIFO and LRU page-fault counts
- Page faults across different frame configurations
- Page-hit and page-fault ratios
- Cumulative page faults
- Page-reference frequencies

### Controlled Experiments

The simulator compares FIFO and LRU using identical reference strings with 3, 4, and 5 memory frames.

Users can explore each configuration and examine the resulting frame states and performance differences.

### Belady's Anomaly Detection

The simulator includes a predefined workload demonstrating Belady's anomaly, where increasing the number of frames can increase the page-fault count under FIFO.

### Result Export

Users can export simulation results in CSV or JSON format for further analysis.

## 6. System Design and Workflow

The simulator uses a common experiment controller to provide identical input conditions to FIFO and LRU.

**System Workflow:**

```text
              PAGE REFERENCE STRING
                       +
              MEMORY FRAME COUNT
                       |
                       v
              EXPERIMENT CONTROLLER
                       |
              +--------+--------+
              |                 |
              v                 v
        FIFO SIMULATOR     LRU SIMULATOR
              |                 |
              v                 v
        MEMORY STATES      MEMORY STATES
        HITS / FAULTS      HITS / FAULTS
              |                 |
              +--------+--------+
                       |
                       v
                 METRIC COLLECTION
                       |
                       v
               PERFORMANCE COMPARISON
                       |
                       v
              TABLES / GRAPHS / RESULTS
```

Both algorithms operate independently using identical inputs so that performance differences can be attributed to the replacement policy.

## 7. Performance Metrics

The simulator evaluates the following metrics.

### Total Page References

The total number of pages requested in the input sequence.

### Page Hits

The number of requests for pages already resident in memory.

### Page Faults

The number of requests for pages not currently resident in memory.

### Page-Fault Rate

\[
\text{Page-Fault Rate} = \frac{\text{Page Faults}}{\text{Total Page References}}
\]

### Page-Hit Ratio

\[
\text{Page-Hit Ratio} = \frac{\text{Page Hits}}{\text{Total Page References}}
\]

The simulator also records replacement decisions, memory-frame contents, and cumulative page hits and faults.

## 8. Running the Project

### Requirements

- A modern web browser such as Google Chrome, Microsoft Edge, or Firefox
- No external packages required for the standalone website

### Instructions

1. Clone or download this repository.
2. Locate the `index.html` file.
3. Open `index.html` in a web browser.
4. Enter a page-reference string or choose a predefined workload.
5. Select the number of available memory frames.
6. Run the experiment and inspect FIFO and LRU results.
7. Explore the memory visualization, charts, heatmaps, execution trace, and automated tests.

### Example Input

```text
Page Reference String:
7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2

Number of Frames:
3
```

### Expected Results

| Metric | FIFO | LRU |
|---|---:|---:|
| Total References | 13 | 13 |
| Page Faults | 10 | 9 |
| Page Hits | 3 | 4 |
| Page-Fault Rate | 76.92% | 69.23% |
| Page-Hit Ratio | 23.08% | 30.77% |

These results illustrate how the choice of replacement policy can affect memory performance.

## 9. Testing and Validation

The simulator includes automated test cases to verify algorithm behavior and measurement calculations.

### Test Cases

| Test Case | Frames | Expected FIFO Faults | Expected LRU Faults |
|---|---:|---:|---:|
| Standard reference string | 3 | 10 | 9 |
| Belady reference string | 3 | 9 | 10 |
| Belady reference string | 4 | 10 | 8 |
| Repeated page accesses | 3 | 1 | 1 |
| Single-frame configuration | 1 | 3 | 3 |

### Correctness Conditions

The test suite verifies:

- Page Hits + Page Faults = Total Page References
- Number of resident pages does not exceed frame capacity
- No duplicate pages are stored in physical memory frames
- FIFO preserves arrival ordering
- LRU updates page recency after accesses

To execute the tests, open the website and select **Run Tests** under Automated Simulator Tests.

The interface displays execution progress and reports PASS or FAIL for each test.

## 10. Tools and Technologies

| Component | Technology |
|---|---|
| Web Interface | HTML5 |
| Styling | CSS3 |
| Interactive Simulation | JavaScript |
| Page Replacement Logic | FIFO and LRU |
| Visualization | HTML, CSS, SVG |
| Development Environment | Visual Studio Code |
| Version Control | Git |
| Repository Hosting | GitHub |
| Project Management | GitHub Issues and GitHub Projects |
| Planned Python Implementation | Python 3, Standard Library |

The interactive website runs directly in a browser without additional libraries.

## 11. Experimental Approach

Both replacement algorithms are evaluated using the same page-reference workload and memory-frame configuration.

The experimental procedure is:

1. Select a predefined or custom page-reference string.
2. Configure the number of available frames.
3. Execute FIFO and LRU separately using identical inputs.
4. Record every page hit, fault, and memory-frame transition.
5. Calculate total hits, total faults, hit ratios, and fault rates.
6. Compare the results using tables, graphs, and visual traces.
7. Repeat the experiment with different frame configurations.

Since FIFO and LRU are deterministic for fixed input conditions, the simulator produces reproducible results.

## 12. Limitations and Scope

This project focuses specifically on FIFO and LRU page replacement behavior within a simplified virtual memory model.

The browser simulator does not attempt to reproduce the complete functionality of an operating system, hardware memory management unit, or physical processor.

Actual disk-access latency, CPU cycle timing, hardware-level register operations, and complete page-table address translation are outside the current simulation scope.

## 13. GitHub Repository

**Repository:** https://github.com/Dharanikondapally/Group04_CSCE5610_FA26

**Project Board:** https://github.com/users/Dharanikondapally/projects/1

## 14. Conclusion

This project demonstrates how FIFO and LRU page replacement policies influence virtual memory behavior and performance.

By processing identical workloads with different frame configurations, the simulator provides a controlled way to observe page hits, page faults, replacement decisions, and memory-frame changes.

The interactive visualizations and quantitative measurements make it easier to understand the differences between FIFO and LRU and analyze their effectiveness under various memory constraints.