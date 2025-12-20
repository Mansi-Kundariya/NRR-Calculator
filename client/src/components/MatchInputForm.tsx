import type React from "react";
import { useState } from "react";
import type { Team, MatchScenario } from "../types";
import { toast } from "react-toastify";

interface MatchInputFormProps {
  teams: Team[];
  onCalculate: (scenario: MatchScenario) => void;
}

export function MatchInputForm({ teams, onCalculate }: MatchInputFormProps) {
  const [yourTeam, setYourTeam] = useState<number>(0);
  const [oppositionTeam, setOppositionTeam] = useState<number>(0);
  const [matchOvers, setMatchOvers] = useState<string>("20");
  const [desiredPosition, setDesiredPosition] = useState<string>("3");
  const [tossResult, setTossResult] = useState<"batting" | "bowling">(
    "batting"
  );
  const [runs, setRuns] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!yourTeam || !oppositionTeam || !runs) {
      toast.error("Please fill in all required fields");
      return;
    }

    const scenario: MatchScenario = {
      yourTeam,
      oppositionTeam,
      matchOvers: Number.parseFloat(matchOvers),
      desiredPosition: Number.parseInt(desiredPosition),
      tossResult,
      runs: Number.parseInt(runs),
    };

    onCalculate(scenario);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="your-team"
            className="block text-base font-semibold text-gray-900"
          >
            Your Team
          </label>
          <select
            id="your-team"
            value={yourTeam}
            onChange={(e) => setYourTeam(Number(e.target.value))}
            className="w-full h-11 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm"
          >
            <option value="">Select your team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.teamName}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="opposition-team"
            className="block text-base font-semibold text-gray-900"
          >
            Opposition Team
          </label>
          <select
            id="opposition-team"
            value={oppositionTeam}
            onChange={(e) => setOppositionTeam(Number(e.target.value))}
            className="w-full h-11 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm"
          >
            <option value="">Select opposition team</option>
            {teams
              .filter((team) => team.id !== yourTeam)
              .map((team) => (
                <option key={team.id} value={team.id}>
                  {team.teamName}
                </option>
              ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="match-overs"
            className="block text-base font-semibold text-gray-900"
          >
            Match Overs
          </label>
          <input
            id="match-overs"
            type="number"
            value={matchOvers}
            onChange={(e) => setMatchOvers(e.target.value)}
            placeholder="20"
            min="1"
            max="50"
            className="w-full h-11 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="desired-position"
            className="block text-base font-semibold text-gray-900"
          >
            Desired Position
          </label>
          <input
            id="desired-position"
            type="number"
            value={desiredPosition}
            onChange={(e) => setDesiredPosition(e.target.value)}
            placeholder="3"
            min="1"
            max={teams.length.toString()}
            className="w-full h-11 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-base font-semibold text-gray-900">
          Toss Result
        </label>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="batting"
              name="toss"
              value="batting"
              checked={tossResult === "batting"}
              onChange={(e) =>
                setTossResult(e.target.value as "batting" | "bowling")
              }
              className="w-4 h-4 text-blue-900 border-gray-300 focus:ring-2 focus:ring-blue-900"
            />
            <label
              htmlFor="batting"
              className="text-sm font-normal cursor-pointer text-gray-700"
            >
              Batting First
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="bowling"
              name="toss"
              value="bowling"
              checked={tossResult === "bowling"}
              onChange={(e) =>
                setTossResult(e.target.value as "batting" | "bowling")
              }
              className="w-4 h-4 text-blue-900 border-gray-300 focus:ring-2 focus:ring-blue-900"
            />
            <label
              htmlFor="bowling"
              className="text-sm font-normal cursor-pointer text-gray-700"
            >
              Bowling First
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="runs"
          className="block text-base font-semibold text-gray-900"
        >
          {tossResult === "batting" ? "Runs Scored" : "Runs to Chase"}
        </label>
        <input
          id="runs"
          type="number"
          value={runs}
          onChange={(e) => setRuns(e.target.value)}
          placeholder={tossResult === "batting" ? "120" : "119"}
          min="0"
          className="w-full h-11 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full h-12 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        Calculate NRR Scenario
      </button>
    </form>
  );
}
