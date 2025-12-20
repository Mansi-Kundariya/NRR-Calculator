import request from "supertest";
import app from "..";

describe("POST /api/nrr/calculate", () => {
  it("returns 400 for missing input", async () => {
    const res = await request(app).post("/api/nrr/calculate").send({});
    expect(res.status).toBe(400);
  });

  it("returns 404 for missing input", async () => {
    const res = await request(app)
      .post("/api/nrr/calculate")
      .send({
        teamName: "Rajasthan Royals",
        opponentName: "Delhi Capitals",
        matchOvers: 20,
        desiredPosition: 1,
        toss: "BATTING_FIRST",
        runs: 10,
      });
    expect(res.status).toBe(404);
  });

  it("returns 200 for valid batting first request", async () => {
    const res = await request(app).post("/api/nrr/calculate").send({
      teamName: "Rajasthan Royals",
      opponentName: "Delhi Capitals",
      matchOvers: 20,
      desiredPosition: 3,
      toss: "BATTING_FIRST",
      runs: 120,
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
