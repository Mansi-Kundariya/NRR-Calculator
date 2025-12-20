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

  const upperNRR = sorted[desiredPosition - 2]?.nrr ?? Infinity;
  const lowerNRR = sorted[desiredPosition - 1]?.nrr ?? -Infinity;

  const nrrAt = (overs: number) =>
    calculateNRR({
      runsFor: newRunsFor,
      oversFaced: oldOversFaced + overs,
      runsAgainst: newRunsAgainst,
      oversBowled: newOversBowled,
    });

  // Binary search for find minimum R (NRR just below upperNRR)
  let low = 0.1,
    high = matchOversDecimal;
  let minOvers = null;

  while (high - low > 0.01) {
    const mid = Number(((low + high) / 2).toFixed(3));
    if (nrrAt(mid) < upperNRR) {
      minOvers = mid;
      high = mid;
    } else {
      low = mid;
    }
  }

  // Binary search for find maximum R (NRR just above lowerNRR)
  low = 0.1;
  high = matchOversDecimal;
  let maxOvers = null;

  while (high - low > 0.01) {
    const mid = (low + high) / 2;
    if (nrrAt(mid) > lowerNRR) {
      maxOvers = mid;
      low = mid;
    } else {
      high = mid;
    }
  }

  if (!minOvers || !maxOvers || minOvers > maxOvers) {
    return null;
  }

  return {
    minOvers: +minOvers.toFixed(1),
    maxOvers: +maxOvers.toFixed(1),
    minNRR: +nrrAt(maxOvers).toFixed(3),
    maxNRR: +nrrAt(minOvers).toFixed(3),
  };
}
