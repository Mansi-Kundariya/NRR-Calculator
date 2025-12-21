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

  let low = 0;
  let high = teamRuns;
  let minRuns: number | null = null;
  let maxRuns: number | null = null;

  const simulate = (oppRuns: number) => {
    const teamWin = teamRuns > oppRuns;

    const updatedTeam = {
      ...team,
      runsFor: team.runsFor + teamRuns,
      oversFaced: oversToDecimal(team.oversFaced) + matchOversDec,
      runsAgainst: team.runsAgainst + oppRuns,
      oversBowled: oversToDecimal(team.oversBowled) + matchOversDec,
      points: team.points + (teamWin ? 2 : 0),
    };

    const updatedOpponent = {
      ...opponent,
      runsFor: opponent.runsFor + oppRuns,
      oversFaced: oversToDecimal(opponent.oversFaced) + matchOversDec,
      runsAgainst: opponent.runsAgainst + teamRuns,
      oversBowled: oversToDecimal(opponent.oversBowled) + matchOversDec,
      points: opponent.points + (!teamWin ? 2 : 0),
    };

    updatedTeam.nrr = calculateNRR(updatedTeam);
    updatedOpponent.nrr = calculateNRR(updatedOpponent);

    const updatedTable = pointsTable.map((t) => {
      if (t.id === teamId) return updatedTeam;
      if (t.id === opponentId) return updatedOpponent;
      return t;
    });

    return {
      position: getTeamPosition(updatedTable, teamId),
      nrr: updatedTeam.nrr,
    };
  };

  // Find min
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const res = simulate(mid);

    if (res.position <= desiredPosition) {
      minRuns = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  if (minRuns === null) return null;

  // Find max
  low = minRuns;
  high = teamRuns;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const res = simulate(mid);

    if (res.position <= desiredPosition) {
      maxRuns = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  if (maxRuns === null) return null;

  return {
    minRuns,
    maxRuns,
    minNRR: +simulate(maxRuns).nrr.toFixed(3),
    maxNRR: +simulate(minRuns).nrr.toFixed(3),
  };
}
