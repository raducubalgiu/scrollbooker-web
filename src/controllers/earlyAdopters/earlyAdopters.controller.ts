import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  EarlyAdopterCreate,
  EarlyAdopterResponse,
} from "@/ts/models/earlyAdopters/EarlyAdopter";

const BACKEND_URL = process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT;

// Formular de pe landing page (nu ține de auth — nu există sesiune la acest
// punct), deci apelează backend-ul direct, la fel ca useSubmitBusinessLeadMutation
// din leads.controller.ts.
export const useCreateEarlyAdopterMutation = () => {
  return useMutation({
    mutationFn: async (data: EarlyAdopterCreate) => {
      const response = await axios.post<EarlyAdopterResponse>(
        `${BACKEND_URL}/early-adopters`,
        data
      );
      return response.data;
    },
  });
};
