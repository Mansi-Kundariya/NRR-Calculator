import type { Team } from "../types";

interface PointsTableProps {
  teams: Team[];
}

export function PointsTable({ teams }: PointsTableProps) {
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.nrr - a.nrr;
  });

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-blue-900/5 hover:bg-blue-900/10 transition-colors">
            <th className="font-bold text-left p-3 text-sm w-12">#</th>
            <th className="font-bold text-left p-3 text-sm">Team</th>
            <th className="font-bold text-center p-3 text-sm">M</th>
            <th className="font-bold text-center p-3 text-sm">W</th>
            <th className="font-bold text-center p-3 text-sm">L</th>
            <th className="font-bold text-center p-3 text-sm">NRR</th>
            <th className="font-bold text-center p-3 text-sm">For</th>
            <th className="font-bold text-center p-3 text-sm">Against</th>
            <th className="font-bold text-center p-3 text-sm">Pts</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team) => (
            <tr
              key={team.id}
              className="hover:bg-gray-50 transition-colors border-t border-gray-100"
            >
              <td className="font-medium p-3 text-sm">{team.id}</td>
              <td className="font-semibold p-3 text-sm">{team.teamName}</td>
              <td className="text-center p-3 text-sm">{team.matches}</td>
              <td className="text-center p-3 text-sm">{team.wins}</td>
              <td className="text-center p-3 text-sm">{team.losses}</td>
              <td className="text-center p-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    team.nrr >= 0
                      ? "bg-orange-500/80 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {team.nrr >= 0 ? "+" : ""}
                  {team.nrr.toFixed(3)}
                </span>
              </td>
              <td className="text-center p-3 text-sm text-gray-600">
                {team.runsFor}/{team.oversFor}
              </td>
              <td className="text-center p-3 text-sm text-gray-600">
                {team.runsAgainst}/{team.oversBowled}
              </td>
              <td className="text-center p-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border border-gray-300 bg-white">
                  {team.points}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
