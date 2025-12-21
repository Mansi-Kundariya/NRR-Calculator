import { pointsTable } from "../data/pointsTable";
import { getTeamPosition } from "../utils/getTeamPosition.util";
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
  opponentId,
  targetRuns,
  matchOvers,
  desiredPosition,
}: ChasingInput) {
  const team = pointsTable.find((t) => t.id === teamId);
  const opponent = pointsTable.find((t) => t.id === opponentId);
  if (!team || !opponent) return null;

  const matchBalls = matchOvers * 6;
  const maxChaseBalls = matchBalls - 1; // must win before last ball

  let low = 1; // minimum 1 ball
  let high = maxChaseBalls;

  let minBalls: number | null = null;
  let maxBalls: number | null = null;

  function oversToBalls(overs: number): number {
    const wholeOvers = Math.floor(overs);
    const balls = Math.round((overs - wholeOvers) * 10);
    return wholeOvers * 6 + balls;
  }

  function ballsToOvers(balls: number): number {
    const overs = Math.floor(balls / 6);
    const remBalls = balls % 6;
    return Number(`${overs}.${remBalls}`);
  }

  const simulate = (balls: number) => {
    if (balls >= matchBalls) return null;

    const overs = balls / 6;

    const updatedTeam = {
      ...team,
      runsFor: team.runsFor + targetRuns,
      oversFaced: oversToDecimal(team.oversFaced) + overs,
      runsAgainst: team.runsAgainst + targetRuns,
      oversBowled: oversToDecimal(team.oversBowled) + matchOvers,
      points: team.points + 2,
    };

    const updatedOpponent = {
      ...opponent,
      runsFor: opponent.runsFor + targetRuns,
      oversFaced: oversToDecimal(opponent.oversFaced) + matchOvers,
      runsAgainst: opponent.runsAgainst + targetRuns,
      oversBowled: oversToDecimal(opponent.oversBowled) + overs,
      points: opponent.points,
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

  /* -------- FIND MIN BALLS -------- */
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const res = simulate(mid);

    if (res && res.position <= desiredPosition) {
      minBalls = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  if (minBalls === null) return null;

  /* -------- FIND MAX BALLS -------- */
  low = minBalls;
  high = maxChaseBalls;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const res = simulate(mid);

    if (res && res.position <= desiredPosition) {
      maxBalls = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  if (maxBalls === null) return null;

  return {
    minOvers: ballsToOvers(minBalls),
    maxOvers: ballsToOvers(maxBalls),
    minNRR: +simulate(maxBalls)!.nrr.toFixed(3),
    maxNRR: +simulate(minBalls)!.nrr.toFixed(3),
  };
}
