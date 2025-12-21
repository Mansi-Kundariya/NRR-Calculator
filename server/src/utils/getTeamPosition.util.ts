import { TeamStats } from "../data/pointsTable";

export function getTeamPosition(updatedTable: TeamStats[], teamId: number) {
  const sorted = [...updatedTable].sort(
    (a, b) => b.points - a.points || b.nrr - a.nrr
  );
  return sorted.findIndex(t => t.id === teamId) + 1;
}
