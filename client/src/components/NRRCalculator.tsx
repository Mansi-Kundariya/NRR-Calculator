"use client";

import { useEffect, useState } from "react";
import type {
  Team,
  MatchScenario,
  NrrRequest,
  CalculationResult,
} from "../types";
import { PointsTable } from "./PointsTable";
import { ResultsDisplay } from "./ResultsDisplay";
import { MatchInputForm } from "./MatchInputForm";
import { getPointTable } from "../api/getData";
import { calculateNRR } from "../api/nrrApi";
import { toast } from "react-toastify";

export function NRRCalculator() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = async (scenario: MatchScenario) => {
    const data: NrrRequest = {
      teamId: scenario.yourTeam,
      opponentId: scenario.oppositionTeam,
      matchOvers: scenario.matchOvers,
      desiredPosition: scenario.desiredPosition,
      toss:
        scenario.tossResult === "batting" ? "BATTING_FIRST" : "BOWLING_FIRST",
      runs: scenario.runs,
    };

    await calculateNRR(data)
      .then((response) => {
        console.log(response);
        const resData: CalculationResult = {
          ...response.data,
          teamName:
            teams.find((t) => t.id === scenario.yourTeam)?.teamName || "",
          opponentName:
            teams.find((t) => t.id === scenario.oppositionTeam)?.teamName || "",
          matchOvers: scenario.matchOvers,
          desiredPosition: scenario.desiredPosition,
          runs: scenario.runs,
          tossResult: scenario.tossResult,
        };
        setResult(resData);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "Something went wrong!");
        setResult(null);
        console.error("Error calculating NRR:", error);
      });
  };

  useEffect(() => {
    getPointTable().then((response) => {
      return setTeams(response.data);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="border border-blue-900/20 shadow-lg rounded-lg bg-white overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Current Points Table
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            IPL 2022 Tournament Standings
          </p>
        </div>
        <div className="p-6">
          <PointsTable teams={teams} />
        </div>
      </div>

      <div className="border border-blue-900/20 shadow-lg rounded-lg bg-white overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Match Scenario Calculator
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter match details to calculate required performance metrics
          </p>
        </div>
        <div className="p-6">
          <MatchInputForm teams={teams} onCalculate={handleCalculate} />
        </div>
      </div>

      {result && (
        <div className="border border-orange-500/30 shadow-lg rounded-lg from-white to-orange-50 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-orange-600">
              Calculation Results
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Strategic performance requirements
            </p>
          </div>
          <div className="p-6">
            <ResultsDisplay result={result} />
          </div>
        </div>
      )}
    </div>
  );
}
