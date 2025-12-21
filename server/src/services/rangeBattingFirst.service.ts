import { pointsTable } from "../data/pointsTable";
import { getTeamPosition } from "../utils/getTeamPosition.util";
import { calculateNRR } from "../utils/nrr.util";
import { oversToDecimal } from "../utils/oversToDecimal.util";

interface BattingFirstInput {
  teamId: number;
  opponentId: number;
  teamRuns: number;
  matchOvers: number;
  desiredPosition: number;
}

/**
 * Calculates the range of opponent runs for which
 * the given team finishes at the desired position
 * when batting first.
 */
export function calculateBattingFirstRange({
  teamId,
  opponentId,
  teamRuns,
  matchOvers,
  desiredPosition,
}: BattingFirstInput) {
  const team = pointsTable.find((t) => t.id === teamId);
  const opponent = pointsTable.find((t) => t.id === opponentId);
  if (!team || !opponent) return null;

  const matchOversDec = oversToDecimal(matchOvers);

  let minRuns: number | null = Infinity;
  let maxRuns: number | null = -Infinity;

  /**
   * Simulates a single match scenario
   * for given opponent runs and returns the resulting table position and NRR
   */
  const simulate = (oppRuns: number) => {
    const teamWin = teamRuns > oppRuns;

    const updatedTeam = {
      ...team,
      runsFor: team.runsFor + teamRuns,
      oversFaced: oversToDecimal(team.oversFaced) + matchOversDec,
      runsAgainst: team.runsAgainst + oppRuns,
      oversBowled: oversToDecimal(team.oversBowled) + matchOversDec,
      wins: team.wins + (teamWin ? 1 : 0),
      losses: team.losses + (!teamWin ? 1 : 0),
      points: team.points + (teamWin ? 2 : 0),
    };

    const updatedOpponent = {
      ...opponent,
      runsFor: opponent.runsFor + oppRuns,
      oversFaced: oversToDecimal(opponent.oversFaced) + matchOversDec,
      runsAgainst: opponent.runsAgainst + teamRuns,
      oversBowled: oversToDecimal(opponent.oversBowled) + matchOversDec,
      wins: opponent.wins + (!teamWin ? 1 : 0),
      losses: opponent.losses + (teamWin ? 1 : 0),
      points: opponent.points + (!teamWin ? 2 : 0),
    };

    updatedTeam.nrr = calculateNRR(updatedTeam);
    updatedOpponent.nrr = calculateNRR(updatedOpponent);

    const updatedTable = pointsTable
      .map((t) => {
        if (t.id === teamId) return updatedTeam;
        if (t.id === opponentId) return updatedOpponent;
        return t;
      })
      .sort((a, b) => b.points - a.points || b.nrr - a.nrr);

    return {
      position: getTeamPosition(updatedTable, teamId),
      nrr: updatedTeam.nrr,
    };
  };

  for (let oppRuns = 0; oppRuns <= teamRuns; oppRuns++) {
    const res = simulate(oppRuns);
    if (res && res?.position === desiredPosition) {
      if (oppRuns < minRuns!) minRuns = oppRuns;
      if (oppRuns > maxRuns!) maxRuns = oppRuns;
    }
  }

  if (minRuns === Infinity || maxRuns === -Infinity) return null;

  /**
   * minNRR occurs at maximum opponent runs
   * maxNRR occurs at minimum opponent runs
   */
  return {
    minRuns,
    maxRuns,
    minNRR: +simulate(maxRuns).nrr.toFixed(3),
    maxNRR: +simulate(minRuns).nrr.toFixed(3),
  };
}
