# Group04_CSCE5610_FA26

CSCE 5610 Computer Architecture Fall 2026 Team Project

# CSCE 5610 Computer Architecture Project

## Group 4

### Team Members

1. **Ruchitha Sri Sai Valli Thanmayee Potladurthy**
   - Student ID: 11855553

2. **Adla Sanjay Ramaswamy**
   - Student ID: 11828288

3. **Dharani Kondapally**
   - Student ID: 11853256

## Preferred Project Idea

**Comparative Analysis of FIFO and LRU Page Replacement Algorithms in Virtual Memory**

## Alternate Project Idea

CPU Thermal Throttling Simulator

## Architecture Component

Our project focuses on virtual memory and memory management in computer architecture. We plan to study and compare how FIFO and LRU page replacement algorithms manage pages when the available memory frames are limited.

## Possible Workloads

We plan to use different page-reference strings and memory-frame sizes as workloads. Both FIFO and LRU will be tested using the same inputs so that their behavior and performance can be compared fairly.

## Possible Performance Metrics

- Number of page faults
- Page fault rate
- Number of page hits
- Page hit ratio
- Performance differences between FIFO and LRU

## Current Project Status

The team has completed the initial project planning and selected the comparison of FIFO and LRU page replacement algorithms as the preferred project idea. We are currently identifying suitable workloads, performance metrics, and background material for the project.

## Objective

The objective of this project is to build a Python-based virtual memory simulator that implements and compares FIFO (First-In, First-Out) and LRU (Least Recently Used) page replacement algorithms. Both algorithms will process the same page-reference workloads under identical memory-frame constraints. The project will examine how FIFO and LRU differ in page-fault and page-hit performance across multiple reference strings and frame configurations.

## Planned Comparison

FIFO and LRU will be tested using the same page-reference strings and the same number of available memory frames. Multiple fixed reference strings and frame configurations, including 3, 4, and 5 frames, will be used. The comparison will focus on the number of page faults, number of page hits, page-fault rate, page-hit ratio, and changes in frame states during execution.

## Tools and Dependencies

- Python 3
- Python Standard Library
- Visual Studio Code or another Python-capable IDE
- Git and GitHub
- GitHub Issues and GitHub Projects

The minimum working version of the simulator will not require specialized hardware, an external architecture simulator, privileged operating-system access, or additional third-party Python libraries.
