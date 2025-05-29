import React, { useCallback, useEffect, useState } from "react";
import { Tooltip, Checkbox, CircularProgress } from "@mui/material";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { MRT_Row } from "material-react-table";
import { BusinessType } from "@/models/nomenclatures/BusinessType";
import { find } from "lodash";

type ServiceBusinessTypeCheckboxProps = {
	row: MRT_Row<BusinessType>;
	serviceId: number | undefined;
	serviceName: string;
};

export default function ServiceBusinessTypeCheckbox({
	row,
	serviceId,
	serviceName,
}: ServiceBusinessTypeCheckboxProps) {
	const {
		data: attachedBusinessTypes,
		isLoading: isLoadingAttached,
		refetch: refetchAttached,
	} = useCustomQuery<BusinessType[]>({
		key: ["business-types", serviceId],
		url: "/api/nomenclatures/services/business-types",
		params: { serviceId },
	});

	const [checked, setChecked] = useState(true);

	useEffect(() => {
		setChecked(!!find(attachedBusinessTypes, ["id", row.original.id]));
	}, [attachedBusinessTypes, row.original.id, isLoadingAttached]);

	const { mutateAsync: handleAttach, isPending: isPendingAttach } = useMutate({
		key: ["attach-business-types"],
		url: "/api/nomenclatures/services/business-types",
		options: {
			onError: () => setChecked(false),
		},
	});

	const { mutateAsync: handleDetach, isPending: isPendingDetach } = useMutate({
		key: ["detach-business-types"],
		url: "/api/nomenclatures/services/business-types",
		method: "DELETE",
		options: {
			onError: () => setChecked(true),
		},
	});

	const handleCheckbox = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>, businessTypeId: number) => {
			if (e.target.checked) {
				await handleAttach({ serviceId, businessTypeId });
			} else {
				await handleDetach({ serviceId, businessTypeId });
			}

			await refetchAttached();
		},
		[refetchAttached, handleAttach, serviceId, handleDetach]
	);

	const isLoading = isPendingAttach || isPendingDetach || isLoadingAttached;
	const action = !checked ? "Creaază" : "Elimină";

	return (
		<Tooltip title={`${action} relația ${serviceName} - ${row.original.name}`}>
			{!isLoading ? (
				<Checkbox
					checked={checked}
					onChange={e => handleCheckbox(e, Number(row.original.id))}
					size="small"
				/>
			) : (
				<CircularProgress size={25} />
			)}
		</Tooltip>
	);
}
