# <img width="25" height="25" alt="logo" src="https://github.com/user-attachments/assets/c875656b-186a-478b-9939-cc5040240b31" /> NRR-Calculator

NRR Calculator and Match Simulation tool for IPL-style Points Table.  
Built as part of the **CricHeroes – Full Stack Developer Practical Assignment**.

---

## 🚀 Tech Stack

### Backend
- Node.js
- TypeScript
- Express
- Jest (Unit & Integration Testing)

### Frontend
- React
- TypeScript
- Tailwind CSS (used only for styling)

### Data Handling
- No database used
- All data handled in-memory as per assignment instructions

---

## 🧠 Problem Overview

The application helps a team determine the **required performance** in their next match
to reach a **desired position** in the IPL points table.

Based on user inputs, the system:
1. Simulates the next match
2. Recalculates Net Run Rate (NRR)
3. Updates and sorts the points table
4. Determines whether the desired position is achievable
5. Calculates a **range of runs or overs** required to achieve that position

---

## 📐 Net Run Rate (NRR) Formula
NRR = (Total Runs Scored / Total Overs Faced) - (Total Runs Conceded / Total Overs Bowled)


### Notes
- Overs like `128.2` are treated as `128 + (2/6)`
- If a team is all out, full overs are counted
- All ranges are calculated dynamically (no hardcoding)

---

## 📂 Project Structure

```
NRR-Calculator/
├── server/
│ ├── src/
│ │ ├── controllers/
│ │ ├── data/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── utils/
│ │ ├── tests/
│ │ ├── index.ts
│ │ └── server.ts
│ ├── jest.config.js
│ ├── tsconfig.json
│ └── package.json
│
├── client/
│ ├── public/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── types/
│ │ └── App.tsx
│ └── package.json
│
└── README.md
```
---

## ⚙️ Backend Setup & Run

### Install dependencies
```bash
cd server
npm install
```

Start backend server
```bash
npm run dev
```

🧪 Running Backend Tests

All critical backend logic is covered using Jest unit and integration tests.

### Run tests
```bash
npm test
```
<img width="1079" height="356" alt="image" src="https://github.com/user-attachments/assets/3a10cac6-54e7-4dfe-aa20-6039fcba2c5a" />

## Test Coverage Includes
1. Overs to decimal conversion (unit tests)
2. NRR calculation (unit tests)
3. Range calculation for runs scored and run to chase (integration tests)
4. API validation using Supertest

📸 Test result screenshots are included in the submission as required.

---

### 🖥️ Frontend Setup & Run
Install dependencies
```bash
cd client
npm install
```

Start frontend
```bash
npm run dev
```
#### Point Table : 
<img width="1900" height="695" alt="image" src="https://github.com/user-attachments/assets/549da64d-bde7-4f83-9cc6-30a449169014" />

#### Case 1 : Runs Scored (Batting First)
<img width="1899" height="700" alt="image" src="https://github.com/user-attachments/assets/dda7581c-8c89-4aa9-acd0-8c2d902b8ba8" />
<img width="1894" height="546" alt="image" src="https://github.com/user-attachments/assets/dcc0b55c-0e8a-4c52-be57-edf23a74be20" />

#### Case 2 : Runs to Chase (Bowling First)
<img width="1891" height="698" alt="image" src="https://github.com/user-attachments/assets/d74aa3ce-0d61-4f6d-b55d-0b704a292e31" />
<img width="1893" height="549" alt="image" src="https://github.com/user-attachments/assets/a77467ce-8e22-430a-acc3-4bf98e5f74c7" />

---

### 🏁 Conclusion
This project demonstrates:
 - Strong algorithmic problem-solving
 - Correct Net Run Rate calculations
 - Clean backend architecture
 - Proper unit and integration testing practices

## 👩‍💻 Developed By
**Mansi Patel**
Full Stack Developer