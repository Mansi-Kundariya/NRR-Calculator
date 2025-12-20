import axios from "axios";
import type { DataResponse } from "../types";

export const getPointTable = async (): Promise<DataResponse> => {
  const response = await axios.post<DataResponse>(
    `${import.meta.env.VITE_APP_API_BASE}/api/data`
  );
  return response.data;
};
