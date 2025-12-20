export interface NrrRequest {
  teamId: number;
  opponentId: number;
  matchOvers: number;
  desiredPosition: number;
  toss: "BATTING_FIRST" | "BOWLING_FIRST";
  runs: number;
}

export interface NrrResponseData {
  minRuns?: number;
  maxRuns?: number;
  minOvers?: number;
  maxOvers?: number;
  minNRR: number;
  maxNRR: number;
}

export interface NrrResponse {
  success: boolean;
  data: NrrResponseData;
  message: string;
}

export interface DataResponse {
  success: boolean;
  data: Team[];
  message: string;
}

export interface Team {
  id: number
  teamName: string
  matches: number
  wins: number
  losses: number
  nrr: number
  runsFor: number
  oversFaced: number
  runsAgainst: number
  oversBowled: number
  points: number
}

export interface MatchScenario {
  yourTeam: number
  oppositionTeam: number
  matchOvers: number
  desiredPosition: number
  tossResult: "batting" | "bowling"
  runs: number
}

export interface CalculationResult {
  minRuns?: number;
  maxRuns?: number;
  minOvers?: number;
  maxOvers?: number;
  minNRR: number;
  maxNRR: number;
  teamName: string;
  opponentName: string;
  matchOvers: number;
  desiredPosition: number;
  runs: number;
  tossResult: "batting" | "bowling";
}
