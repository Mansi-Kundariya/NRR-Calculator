// Integration tests for calculateBattingFirstRange service
import { calculateBattingFirstRange } from "../services/rangeBattingFirst.service";

describe("calculateBattingFirstRange", () => {
  it("returns valid run restriction range", () => {
    const result = calculateBattingFirstRange({
      teamId: 4,
      opponentId: 3,
      teamRuns: 120,
      matchOvers: 20,
      desiredPosition: 3,
    });

    expect(result).not.toBeNull();
    expect(result!.minRuns).toBeLessThanOrEqual(result!.maxRuns);
  });

  it("returns null when no valid range exists", () => {
    const result = calculateBattingFirstRange({
      teamId: 4,
      opponentId: 3,
      teamRuns: 10,
      matchOvers: 20,
      desiredPosition: 1,
    });

    expect(result).toBeNull();
  });
});
