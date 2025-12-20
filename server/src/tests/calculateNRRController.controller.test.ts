// Integration/e2e tests for NRR calculation controller
import request from "supertest";
import app from "..";

describe("POST /api/nrr/calculate", () => {
  it("should returns 400 for missing input", async () => {
    const res = await request(app).post("/api/nrr/calculate").send({});
    expect(res.status).toBe(400);
  });

  it("should returns 400 for invalid desired position", async () => {
    const res = await request(app).post("/api/nrr/calculate").send({
      teamId: 4,
      opponentId: 3,
      matchOvers: 20,
      desiredPosition: 0,
      toss: "BATTING_FIRST",
      runs: 10,
    });
    expect(res.status).toBe(400);
  });

  it("should returns 400 for negative match overs", async () => {
    const res = await request(app).post("/api/nrr/calculate").send({
      teamId: 4,
      opponentId: 3,
      matchOvers: -2,
      desiredPosition: 5,
      toss: "BOWLING_FIRST",
      runs: 10,
    });
    expect(res.status).toBe(400);
  });

  it("should returns 400 for invalid desired position", async () => {
    const res = await request(app).post("/api/nrr/calculate").send({
      teamId: 4,
      opponentId: 3,
      matchOvers: 20,
      desiredPosition: 0,
      toss: "BATTING_FIRST",
      runs: 10,
    });
    expect(res.status).toBe(400);
  });

  it("should returns 400 for negative runs", async () => {
    const res = await request(app).post("/api/nrr/calculate").send({
      teamId: 1,
      opponentId: 5,
      matchOvers: 20,
      desiredPosition: 1,
      toss: "BATTING_FIRST",
      runs: -10,
    });
    expect(res.status).toBe(400);
  });

  it("should returns 200 for valid batting first request", async () => {
    const res = await request(app).post("/api/nrr/calculate").send({
      teamId: 4,
      opponentId: 3,
      matchOvers: 20,
      desiredPosition: 3,
      toss: "BATTING_FIRST",
      runs: 120,
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
