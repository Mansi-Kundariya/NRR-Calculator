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

/**
 * Calculates the range of balls (or overs) within which
 * the chasing team must finish the chase to achieve
 * the desired points table position.
 */
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

  let minBalls: number | null = Infinity;
  let maxBalls: number | null = -Infinity;

  function ballsToOvers(balls: number): number {
    const overs = Math.floor(balls / 6);
    const remBalls = balls % 6;
    return Number(`${overs}.${remBalls}`);
  }

  /* Simulates a single chasing scenario where
   * the team completes the chase in the given number of balls
   */
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

  for (let ball = low; ball <= high; ball++) {
    const res = simulate(ball);
    if (res && res?.position === desiredPosition) {
      if (ball < minBalls!) minBalls = ball;
      if (ball > maxBalls!) maxBalls = ball;
    }
  }

  if (minBalls === Infinity || maxBalls === -Infinity) return null;

  /**
   * Minimum NRR occurs when chase is completed slower (max balls)
   * Maximum NRR occurs when chase is completed faster (min balls)
   */
  return {
    minOvers: ballsToOvers(minBalls),
    maxOvers: ballsToOvers(maxBalls),
    minNRR: +simulate(maxBalls)!.nrr.toFixed(3),
    maxNRR: +simulate(minBalls)!.nrr.toFixed(3),
  };
}
