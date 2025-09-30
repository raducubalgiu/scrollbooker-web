import React, { useCallback, useEffect, useState } from "react";
import { Tooltip, Checkbox, CircularProgress } from "@mui/material";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { MRT_Row } from "material-react-table";
import { BusinessType } from "@/ts/models/nomenclatures/BusinessType";
import { find } from "lodash";

type ProfessionBusinessTypesCheckboxProps = {
	row: MRT_Row<BusinessType>;
	professionId: number | undefined;
	professionName: string;
};

export default function ProfessionBusinessTypesCheckbox({
	row,
	professionId,
	professionName,
}: ProfessionBusinessTypesCheckboxProps) {
	const {
		data: attachedBusinessTypes,
		isLoading: isLoadingAttached,
		refetch: refetchAttached,
	} = useCustomQuery<BusinessType[]>({
		key: ["profession-business-types", professionId],
		url: "/api/nomenclatures/professions/business-types",
		params: { professionId },
	});

	const [checked, setChecked] = useState(true);

	useEffect(() => {
		setChecked(!!find(attachedBusinessTypes, ["id", row.original.id]));
	}, [attachedBusinessTypes, row.original.id, isLoadingAttached]);

	const { mutateAsync: handleAttach, isPending: isPendingAttach } = useMutate({
		key: ["attach"],
		url: "/api/nomenclatures/professions/business-types",
		options: {
			onError: () => setChecked(false),
		},
	});

	const { mutateAsync: handleDetach, isPending: isPendingDetach } = useMutate({
		key: ["detach"],
		url: "/api/nomenclatures/professions/business-types",
		method: "DELETE",
		options: {
			onError: () => setChecked(true),
		},
	});

	const handleCheckbox = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>, businessTypeId: number) => {
			if (e.target.checked) {
				await handleAttach({ professionId, businessTypeId });
			} else {
				await handleDetach({ professionId, businessTypeId });
			}

			await refetchAttached();
		},
		[refetchAttached, handleAttach, professionId, handleDetach]
	);

	const isLoading = isPendingAttach || isPendingDetach || isLoadingAttached;
	const action = !checked ? "Creaază" : "Elimină";

	return (
		<Tooltip
			title={`${action} relația ${professionName} - ${row.original.name}`}
		>
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
