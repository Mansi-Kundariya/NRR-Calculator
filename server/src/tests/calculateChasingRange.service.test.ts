// Integration tests for calculateChasingRange service
import { calculateChasingRange } from "../services/rangeChasing.service";

describe("calculateChasingRange", () => {
  it("returns valid overs range for chasing", () => {
    const result = calculateChasingRange({
      teamId: 4,
      opponentId: 3,
      targetRuns: 119,
      matchOvers: 20,
      desiredPosition: 3,
    });

    expect(result).not.toBeNull();
    expect(result!.minOvers).toBeLessThanOrEqual(result!.maxOvers);
  });

  it("returns null when chasing cannot reach desired position", () => {
    const result = calculateChasingRange({
      teamId: 5,
      opponentId: 3,
      targetRuns: 200,
      matchOvers: 20,
      desiredPosition: 1,
    });

    expect(result).toBeNull();
  });
});
