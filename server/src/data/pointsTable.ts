export interface TeamStats {
  id: number;
  teamName: string;
  matches: number;
  wins: number;
  losses: number;

  runsFor: number;
  oversFaced: number;

  runsAgainst: number;
  oversBowled: number;

  points: number;
  nrr: number;
}

export const pointsTable: TeamStats[] = [
  {
    id: 1,
    teamName: "Chennai Super Kings",
    matches: 7,
    wins: 5,
    losses: 2,
    runsFor: 1130,
    oversFaced: 133.1,
    runsAgainst: 1071,
    oversBowled: 138.5,
    points: 10,
    nrr: 0.771,
  },
  {
    id: 2,
    teamName: "Royal Challengers Bangalore",
    matches: 7,
    wins: 4,
    losses: 3,
    runsFor: 1217,
    oversFaced: 140,
    runsAgainst: 1066,
    oversBowled: 131.4,
    points: 8,
    nrr: 0.597,
  },
  {
    id: 3,
    teamName: "Delhi Capitals",
    matches: 7,
    wins: 4,
    losses: 3,
    runsFor: 1085,
    oversFaced: 126,
    runsAgainst: 1136,
    oversBowled: 137,
    points: 8,
    nrr: 0.319,
  },
  {
    id: 4,
    teamName: "Rajasthan Royals",
    matches: 7,
    wins: 3,
    losses: 4,
    runsFor: 1066,
    oversFaced: 128.2,
    runsAgainst: 1094,
    oversBowled: 137.1,
    points: 6,
    nrr: 0.331,
  },
  {
    id: 5,
    teamName: "Mumbai Indians",
    matches: 8,
    wins: 2,
    losses: 6,
    runsFor: 1003,
    oversFaced: 155.2,
    runsAgainst: 1134,
    oversBowled: 138.1,
    points: 4,
    nrr: -1.75,
  },
];
