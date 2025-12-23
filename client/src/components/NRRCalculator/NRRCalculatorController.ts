import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type {
  Team,
  MatchScenario,
  NrrRequest,
  CalculationResult,
} from "../../types";
import { getPointTable } from "../../api/getData";
import { calculateNRR } from "../../api/nrrApi";

const NRRCalculatorController = () => {
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

  return {
    teams,
    result,
    handleCalculate,
  };
};

export default NRRCalculatorController;
