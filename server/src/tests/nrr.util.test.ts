// Unit tests for calculateNRR utility function
import { calculateNRR } from "../utils/nrr.util";
import { oversToDecimal } from "../utils/oversToDecimal.util";

describe("calculateNRR", () => {
  it("calculates NRR correctly", () => {
    const nrr_1 = calculateNRR({
      runsFor: 1066,
      oversFaced: oversToDecimal(128.2),
      runsAgainst: 1094,
      oversBowled: oversToDecimal(137.1),
    });

    expect(nrr_1).toBeCloseTo(0.331, 3);

    const nrr_2 = calculateNRR({
      runsFor: 1146 ,
      oversFaced: oversToDecimal(138.3),
      runsAgainst: 1174 ,
      oversBowled: oversToDecimal(157.1),
    });

    expect(nrr_2).toBeCloseTo(0.805, 3);
  });
});
