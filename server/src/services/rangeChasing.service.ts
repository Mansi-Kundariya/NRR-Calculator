import { pointsTable } from "../data/pointsTable";
import { calculateNRR } from "../utils/nrr.util";
import { oversToDecimal } from "../utils/oversToDecimal.util";

interface ChasingInput {
  teamId: number;
  opponentId: number;
  targetRuns: number;
  matchOvers: number;
  desiredPosition: number;
}

export function calculateChasingRange({
  teamId,
  targetRuns,
  matchOvers,
  desiredPosition,
}: ChasingInput) {
  const team = pointsTable.find((t) => t.id === teamId);
  if (!team) return null;

  const matchOversDecimal = oversToDecimal(matchOvers);

  // Existing team stats before the chase
  const oldOversFaced = oversToDecimal(team.oversFaced);
  const newOversBowled = oversToDecimal(team.oversBowled) + matchOversDecimal;

  // After a successful chase, runs scored
  const newRunsFor = team.runsFor + targetRuns;
  const newRunsAgainst = team.runsAgainst + targetRuns;

  /**
   * Determine the NRR range required to reach the desired table position.
   * Team must end up:
   *  - Below the team above the target position
   *  - Above the team below the target position
   */
  const sorted = [...pointsTable]
    .filter((t) => t.id !== teamId)
    .sort((a, b) => b.nrr - a.nrr);

  const upperNRR =
    desiredPosition === 1 ? Infinity : sorted[desiredPosition - 2]?.nrr;

  const lowerNRR =
    desiredPosition === pointsTable.length
      ? -Infinity
      : sorted[desiredPosition - 1]?.nrr;

  const nrrAt = (overs: number) =>
    calculateNRR({
      runsFor: newRunsFor,
      oversFaced: oldOversFaced + overs,
      runsAgainst: newRunsAgainst,
      oversBowled: newOversBowled,
    });

  let minOvers = 0.1;
  let maxOvers = matchOversDecimal;

  // Case 1: Desired position = 1 (only minimum constraint)
  if (desiredPosition === 1) {
    let low = 0.1,
      high = matchOversDecimal;
    let result = null;

    while (high - low > 0.01) {
      const mid = (low + high) / 2;
      if (nrrAt(mid) >= sorted[0].nrr) {
        result = mid;
        high = mid;
      } else {
        low = mid;
      }
    }

    if (!result) return null;

    return {
      minOvers: +result.toFixed(1),
      maxOvers: +matchOversDecimal.toFixed(1),
      minNRR: +nrrAt(matchOversDecimal).toFixed(3),
      maxNRR: +nrrAt(result).toFixed(3),
    };
  }

  // Case 2: Middle positions (both bounds)
  let low = 0.1,
    high = matchOversDecimal;
  let min = null,
    max = null;

  while (high - low > 0.01) {
    const mid = (low + high) / 2;
    if (nrrAt(mid) < upperNRR) {
      min = mid;
      high = mid;
    } else {
      low = mid;
    }
  }

  low = 0.1;
  high = matchOversDecimal;

  while (high - low > 0.01) {
    const mid = (low + high) / 2;
    if (nrrAt(mid) > lowerNRR) {
      max = mid;
      low = mid;
    } else {
      high = mid;
    }
  }

  if (!min || !max || min > max) return null;

  return {
    minOvers: +min.toFixed(1),
    maxOvers: +max.toFixed(1),
    minNRR: +nrrAt(max).toFixed(3),
    maxNRR: +nrrAt(min).toFixed(3),
  };
}
