import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  BusinessLeadCreate,
  BusinessLeadResponse,
} from "@/ts/models/leads/BusinessLead";

const BACKEND_URL = process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT;

// Formular de interes pentru reclame (nu ține de auth — nu există sesiune
// la acest punct), deci apelează backend-ul direct, la fel ca
// useRegisterMutation din auth.controller.ts.
export const useSubmitBusinessLeadMutation = () => {
  return useMutation({
    mutationFn: async (data: BusinessLeadCreate) => {
      const response = await axios.post<BusinessLeadResponse>(
        `${BACKEND_URL}/leads/business`,
        data
      );
      return response.data;
    },
  });
};
