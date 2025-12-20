import { calculateChasingRange } from "../services/rangeChasing.service";

describe("calculateChasingRange", () => {
  it("returns valid overs range for chasing", () => {
    const result = calculateChasingRange({
      teamName: "Rajasthan Royals",
      opponentName: "Delhi Capitals",
      targetRuns: 119,
      matchOvers: 20,
      desiredPosition: 3,
    });

    expect(result).not.toBeNull();
    expect(result!.minOvers).toBeLessThanOrEqual(result!.maxOvers);
  });
});
