import axios from "axios";
import type { NrrRequest, NrrResponse } from "../types";

export const calculateNRR = async (
  payload: NrrRequest
): Promise<NrrResponse> => {
  const response = await axios.post<NrrResponse>(
    `${import.meta.env.VITE_APP_API_BASE}/api/nrr/calculate`,
    payload
  );
  return response.data;
};
