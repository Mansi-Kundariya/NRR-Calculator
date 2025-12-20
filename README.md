# 🏏 NRR-Calculator

NRR Calculator and Match Simulation tool for IPL-style Points Table  
Built as part of the **CricHeroes Full Stack Developer Practical Assignment**

---

## 🚀 Tech Stack

### Backend
- Node.js
- TypeScript
- Express
- Jest

### Frontend
- React
- TypeScript

### Data Handling
- No database used (in-memory data only)

---

## 🧠 Problem Statement

This application helps a team determine the **required performance** in their next match
to reach a **desired position** in the IPL points table.

The system calculates:
- Net Run Rate (NRR)
- Updated points table after match simulation
- A **range of runs or overs** required to achieve the target rank

---

## 📐 Net Run Rate (NRR) Formula
NRR = (Total Runs Scored / Total Overs Faced) - (Total Runs Conceded / Total Overs Bowled)

---

## ⚙️ Backend Setup

### Install dependencies
```bash
cd server
npm install
