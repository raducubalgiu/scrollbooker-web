import React, { useCallback, useEffect, useState } from "react";
import { Tooltip, Checkbox, CircularProgress } from "@mui/material";
import {
  useAttachProfessionBusinessType,
  useDetachProfessionBusinessType,
} from "@/controllers/nomenclature/profession.controller";

type ProfessionBusinessTypeCheckboxProps = {
  professionId: number;
  businessTypeId: number;
  businessTypeName: string;
  isSelected: boolean;
};

export default function ProfessionBusinessTypeCheckbox({
  professionId,
  businessTypeId,
  businessTypeName,
  isSelected,
}: ProfessionBusinessTypeCheckboxProps) {
  const [checked, setChecked] = useState(isSelected);

  useEffect(() => {
    setChecked(isSelected);
  }, [isSelected]);

  const { mutateAsync: attach, isPending: isPendingAttach } =
    useAttachProfessionBusinessType();
  const { mutateAsync: detach, isPending: isPendingDetach } =
    useDetachProfessionBusinessType();

  const handleCheckbox = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextChecked = e.target.checked;
      setChecked(nextChecked);

      try {
        if (nextChecked) {
          await attach({ professionId, businessTypeId });
        } else {
          await detach({ professionId, businessTypeId });
        }
      } catch {
        setChecked(!nextChecked);
      }
    },
    [attach, detach, professionId, businessTypeId]
  );

  const isLoading = isPendingAttach || isPendingDetach;
  const action = checked ? "Elimină" : "Creează";

  return (
    <Tooltip title={`${action} relația cu ${businessTypeName}`}>
      {!isLoading ? (
        <Checkbox checked={checked} onChange={handleCheckbox} size="small" />
      ) : (
        <CircularProgress size={25} />
      )}
    </Tooltip>
  );
}
