import { pointsTable } from "../data/pointsTable";
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
  const team = pointsTable.find(t => t.id === teamId);
  const opponent = pointsTable.find(t => t.id === opponentId);
  if (!team || !opponent) return null;

  const teamOversFaced = oversToDecimal(team.oversFaced);
  const teamOversBowled = oversToDecimal(team.oversBowled);
  const matchOversDecimal = oversToDecimal(matchOvers);

  const newRunsFor = team.runsFor + teamRuns;
  const newOversFaced = teamOversFaced + matchOversDecimal;
  const newOversBowled = teamOversBowled + matchOversDecimal;

  // Sort table EXCLUDING current team
  const others = [...pointsTable]
    .filter(t => t.id !== teamId)
    .sort((a, b) => b.nrr - a.nrr);

  // Correct boundary handling
  const upperNRR =
    desiredPosition > 1 ? others[desiredPosition - 2].nrr : Infinity;

  const lowerNRR =
    desiredPosition <= others.length
      ? others[desiredPosition - 1].nrr
      : -Infinity;

  const nrrAt = (oppRuns: number) =>
    calculateNRR({
      runsFor: newRunsFor,
      oversFaced: newOversFaced,
      runsAgainst: team.runsAgainst + oppRuns,
      oversBowled: newOversBowled,
    });

  let minRuns: number | null = null;
  let maxRuns: number | null = null;

  // SAFE brute-force (teamRuns ≤ 200, very small)
  for (let r = 0; r < teamRuns; r++) {
    const nrr = nrrAt(r);
    if (nrr > lowerNRR && nrr < upperNRR) {
      if (minRuns === null) minRuns = r;
      maxRuns = r;
    }
  }

  if (minRuns === null || maxRuns === null) return null;

  return {
    minRuns,
    maxRuns,
    minNRR: +nrrAt(maxRuns).toFixed(3),
    maxNRR: +nrrAt(minRuns).toFixed(3),
  };
}

