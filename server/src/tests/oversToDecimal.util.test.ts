import { oversToDecimal } from "../utils/oversToDecimal.util";

describe("oversToDecimal", () => {
  it("should handles whole overs", () => {
    expect(oversToDecimal(20)).toBe(20);
  });

  it("should convert overs to decimal", () => {
    expect(oversToDecimal(95.4)).toBeCloseTo(95.667, 3);
    expect(oversToDecimal(128.2)).toBeCloseTo(128.333, 3);
  });

  it("should return 0 for 0 overs", () => {
    expect(oversToDecimal(0)).toBe(0);
  });

  it("should throw error when overs are invalid", () => {
    expect(() => oversToDecimal(-2)).toThrow("Invalid overs: -2");
    expect(() => oversToDecimal(10.6)).toThrow("Invalid overs format: 10.6");
  });
});
