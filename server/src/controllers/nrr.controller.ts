import { Request, Response } from "express";
import { calculateBattingFirstRange } from "../services/rangeBattingFirst.service";
import { calculateChasingRange } from "../services/rangeChasing.service";

export const calculateNRRController = (req: Request, res: Response) => {
  try {
    const { teamId, opponentId, matchOvers, desiredPosition, toss, runs } =
      req.body;

    if (
      !teamId ||
      !opponentId ||
      !matchOvers ||
      !desiredPosition ||
      !toss ||
      runs === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    let result;

    if (toss === "BATTING_FIRST") {
      result = calculateBattingFirstRange({
        teamId,
        opponentId,
        teamRuns: runs,
        matchOvers,
        desiredPosition,
      });
    } else if (toss === "BOWLING_FIRST") {
      result = calculateChasingRange({
        teamId,
        opponentId,
        targetRuns: runs,
        matchOvers,
        desiredPosition,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid toss input",
      });
    }

    // When no feasible range exists that achieves the desired points-table position
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No valid range found for given inputs",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
