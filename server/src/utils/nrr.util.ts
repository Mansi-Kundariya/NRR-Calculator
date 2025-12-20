/**
 *
 * @param runsFor
 * @param oversFaced
 * @param runsAgainst
 * @param oversBowled
 * @returns
 *
 * Calculates Net Run Rate (NRR)
 *
 * Formula:
 * NRR = (Total Runs Scored / Total Overs Faced)
 *     - (Total Runs Conceded / Total Overs Bowled)
 *
 * Overs are expected in decimal format (e.g. 128.2 → 128.333)
 * before applying the calculation to avoid cricket-notation errors.
 */

interface CalculateNrrInput {
  runsFor: number;
  oversFaced: number;
  runsAgainst: number;
  oversBowled: number;
}
export function calculateNRR(calculateNrrInput: CalculateNrrInput): number {
  const { runsFor, oversFaced, runsAgainst, oversBowled } = calculateNrrInput;

  const overRunRate = runsFor / oversFaced;
  const opponentOverRunRate = runsAgainst / oversBowled;

  const nrr = overRunRate - opponentOverRunRate;

  return Number(nrr.toFixed(3));
}