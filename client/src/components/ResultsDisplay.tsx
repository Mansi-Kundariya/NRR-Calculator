import type { CalculationResult } from "../types";

interface ResultsDisplayProps {
  result: CalculationResult;
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {
  const {
    minRuns,
    maxRuns,
    minOvers,
    maxOvers,
    minNRR,
    maxNRR,
    teamName,
    opponentName,
    matchOvers,
    desiredPosition,
    runs,
    tossResult,
  } = result;

  return (
    <div className="space-y-6">
      {/* Scenario Summary Header */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-gray-300 bg-white">
          {tossResult === "batting" ? "Batting First" : "Bowling First"}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-gray-300 bg-white">
          {matchOvers} Overs
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-gray-300 bg-white">
          Target Position: #{desiredPosition}
        </span>
      </div>

      <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm text-gray-500">
          API Response Values
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-gray-500">
              Min {`${tossResult === "batting" ? "Runs" : "Overs"}`}:
            </span>{" "}
            <span className="font-semibold text-orange-600">
              {tossResult === "batting" ? minRuns : minOvers}
            </span>
          </div>
          <div>
            <span className="text-gray-500">
              Max {`${tossResult === "batting" ? "Runs" : "Overs"}`}::
            </span>{" "}
            <span className="font-semibold text-orange-600">
              {tossResult === "batting" ? maxRuns : maxOvers}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Min NRR:</span>{" "}
            <span className="font-semibold text-blue-900">
              +{minNRR.toFixed(3)}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Max NRR:</span>{" "}
            <span className="font-semibold text-blue-900">
              +{maxNRR.toFixed(3)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-6 border-2 border-blue-900/20 from-white to-blue-50 rounded-lg">
          <div className="space-y-4">
            {tossResult === "batting" && (
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-gray-500">
                    BATTING FIRST
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">
                  If{" "}
                  <span className="font-semibold text-gray-900">
                    {teamName}
                  </span>{" "}
                  scores{" "}
                  <span className="font-semibold text-blue-900">
                    {runs} runs
                  </span>{" "}
                  in{" "}
                  <span className="font-semibold text-blue-900">
                    {matchOvers} overs
                  </span>
                  ,{" "}
                  <span className="font-semibold text-gray-900">
                    {teamName}
                  </span>{" "}
                  need to restrict{" "}
                  <span className="font-semibold text-gray-900">
                    {opponentName}
                  </span>{" "}
                  between{" "}
                  <span className="font-semibold text-orange-600">
                    {minRuns} runs
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-orange-600">
                    {maxRuns} runs
                  </span>{" "}
                  in{" "}
                  <span className="font-semibold text-blue-900">
                    {matchOvers} overs
                  </span>
                  . Revised NRR of{" "}
                  <span className="font-semibold text-gray-900">
                    {teamName}
                  </span>{" "}
                  will be between{" "}
                  <span className="font-semibold text-blue-900">
                    +{minNRR.toFixed(3)}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-blue-900">
                    +{maxNRR.toFixed(3)}
                  </span>
                  .
                </p>
              </div>
            )}

            {tossResult === "bowling" && (
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-gray-500">
                    CHASING
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">
                  <span className="font-semibold text-gray-900">
                    {teamName}
                  </span>{" "}
                  need to chase{" "}
                  <span className="font-semibold text-orange-600">
                    {runs} runs
                  </span>{" "}
                  between{" "}
                  <span className="font-semibold text-blue-900">
                    {minOvers} overs
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-blue-900">
                    {maxOvers} overs
                  </span>
                  . Revised NRR for{" "}
                  <span className="font-semibold text-gray-900">
                    {teamName}
                  </span>{" "}
                  will be between{" "}
                  <span className="font-semibold text-blue-900">
                    +{minNRR.toFixed(3)}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-blue-900">
                    +{maxNRR.toFixed(3)}
                  </span>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
