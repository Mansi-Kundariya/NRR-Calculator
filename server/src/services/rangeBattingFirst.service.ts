import { pointsTable } from "../data/pointsTable";
import { calculateNRR } from "../utils/nrr.util";
import { oversToDecimal } from "../utils/oversToDecimal.util";

interface BattingFirstInput {
  teamName: string;
  opponentName: string;
  teamRuns: number;
  matchOvers: number;
  desiredPosition: number;
}

export function calculateBattingFirstRange({
  teamName,
  opponentName,
  teamRuns,
  matchOvers,
  desiredPosition,
}: BattingFirstInput) {
  const team = pointsTable.find((t) => t.team === teamName);
  const opponent = pointsTable.find((t) => t.team === opponentName);

  if (!team || !opponent) return null;

  // Convert overs to decimal
  const teamOversFaced = oversToDecimal(team.oversFaced);
  const teamOversBowled = oversToDecimal(team.oversBowled);
  const matchOversDecimal = oversToDecimal(matchOvers);

  // Updated team stats after batting first
  const newRunsFor = team.runsFor + teamRuns;
  const newOversFaced = teamOversFaced + matchOversDecimal;
  const newOversBowled = teamOversBowled + matchOversDecimal;

  /**
   * Determine the NRR range required to reach the desired table position.
   * Team must end up:
   *  - Below the team above the target position
   *  - Above the team below the target position
   */
  const sortedTeams = [...pointsTable]
    .filter((t) => t.team !== teamName)
    .sort((a, b) => b.nrr - a.nrr);

  const upperNRR = sortedTeams[desiredPosition - 2]?.nrr ?? Infinity;
  const lowerNRR = sortedTeams[desiredPosition - 1]?.nrr ?? -Infinity;

  const nrrAt = (r: number) =>
    calculateNRR({
      runsFor: newRunsFor,
      oversFaced: newOversFaced,
      runsAgainst: team.runsAgainst + r,
      oversBowled: newOversBowled,
    });

  // Binary search for find minimum R (NRR just below upperNRR)
  let low = 0,
    high = teamRuns;
  let minRuns = null;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nrrAt(mid) < upperNRR) {
      minRuns = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  // Binary search for find maximum R (NRR just above lowerNRR)
  low = 0;
  high = teamRuns;
  let maxRuns = null;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nrrAt(mid) > lowerNRR) {
      maxRuns = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  if (minRuns === null || maxRuns === null || minRuns > maxRuns) {
    return null;
  }

  return {
    minRuns,
    maxRuns,
    minNRR: +nrrAt(maxRuns).toFixed(3),
    maxNRR: +nrrAt(minRuns).toFixed(3),
  };

  /*
  Brute-force : alternative way to calculate NRR range
  
  for (let opponentRuns = 0; opponentRuns <= teamRuns; opponentRuns++) {
    const newRunsAgainst = team.runsAgainst + opponentRuns;

    const nrr = calculateNRR({
      runsFor: newRunsFor,
      oversFaced: newOversFaced,
      runsAgainst: newRunsAgainst,
      oversBowled: newOversBowled,
    });

    if (nrr > lowerNRR && nrr < upperNRR) {
      minRuns = minRuns === null ? opponentRuns : minRuns;
      maxRuns = opponentRuns;
      minNRR = Math.min(minNRR, nrr);
      maxNRR = Math.max(maxNRR, nrr);
    }
  }

  if (minRuns === null || maxRuns === null) return null;

  return {
    minRuns,
    maxRuns,
    minNRR: +minNRR.toFixed(3),
    maxNRR: +maxNRR.toFixed(3),
  };
  */
}
