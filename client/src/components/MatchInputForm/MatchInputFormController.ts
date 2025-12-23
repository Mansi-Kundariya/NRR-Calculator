import type React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import type { MatchScenario } from "../../types";

interface MatchInputFormControllerProps {
  onCalculate: (scenario: MatchScenario) => void;
}

const MatchInputFormController = (props: MatchInputFormControllerProps) => {
  const { onCalculate } = props;
  
  const [yourTeam, setYourTeam] = useState<number>(0);
  const [oppositionTeam, setOppositionTeam] = useState<number>(0);
  const [matchOvers, setMatchOvers] = useState<string>("20");
  const [desiredPosition, setDesiredPosition] = useState<string>("");
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

  return {
    handleSubmit,
    yourTeam,
    setYourTeam,
    oppositionTeam,
    setOppositionTeam,
    matchOvers,
    setMatchOvers,
    desiredPosition,
    setDesiredPosition,
    tossResult,
    setTossResult,
    runs,
    setRuns,
  };
};

export default MatchInputFormController;
