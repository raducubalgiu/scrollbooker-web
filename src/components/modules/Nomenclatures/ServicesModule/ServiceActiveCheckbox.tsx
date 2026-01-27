import { useMutate } from "@/hooks/useHttp";
import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ServiceActiveCheckbox = ({
  serviceId,
  active,
}: {
  serviceId: number | undefined;
  active: boolean | undefined;
}) => {
  const [checked, setChecked] = useState(active);

  const { mutate: handleUpdate } = useMutate({
    key: [`update-service-active`],
    url: `/api/nomenclatures/services`,
    method: "PUT",
    options: {
      onSuccess: () => {
        toast.success("Datele au fost salvate cu succes");
        setChecked((checked) => !checked);
      },
    },
  });

  return (
    <Checkbox
      checked={checked}
      onChange={() => handleUpdate({ id: serviceId, active: !checked })}
    />
  );
};

export default ServiceActiveCheckbox;
