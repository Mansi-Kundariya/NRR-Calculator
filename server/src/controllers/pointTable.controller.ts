import { Request, Response } from "express";
import { pointsTable } from "../data/pointsTable";

export const getPointsTableController = (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      data: pointsTable,
      message: "Data retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
