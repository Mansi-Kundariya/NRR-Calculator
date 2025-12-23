import PointsTable from "../PointsTable";
import ResultsDisplay from "../ResultsDisplay";
import MatchInputForm from "../MatchInputForm";
import NRRCalculatorController from "./NRRCalculatorController";

const NRRCalculator = () => {
  const { teams, result, handleCalculate } = NRRCalculatorController();

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
};

export default NRRCalculator;
