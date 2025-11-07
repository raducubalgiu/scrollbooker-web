import React, { useCallback, useEffect, useState } from "react";
import { Tooltip, Checkbox, CircularProgress } from "@mui/material";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { MRT_Row } from "material-react-table";
import { BusinessType } from "@/ts/models/nomenclatures/BusinessType";
import { find } from "lodash";
import { FilterType } from "@/ts/models/nomenclatures/FilterType";
import { toast } from "react-toastify";

type FilterBusinessTypeCheckboxProps = {
	filterRow: MRT_Row<FilterType>;
	businessTypeRow: MRT_Row<BusinessType>;
	isExpanded: boolean
};

export default function FilterBusinessTypeCheckbox({
	filterRow,
	businessTypeRow,
	isExpanded
}: FilterBusinessTypeCheckboxProps) {
	const { id: filterId, name: filterName } = filterRow.original;
	const { id: businessTypeId, name: businessTypeName } =
		businessTypeRow.original;

	const {
		data: attachedBusinessTypes,
		isLoading: isLoadingAttached,
		refetch: refetchAttached,
	} = useCustomQuery<BusinessType[]>({
		key: ["business-types-attached", filterId],
		url: "/api/nomenclatures/filters/business-types",
		params: { filterId },
		options: { enabled: isExpanded }
	});

	const [checked, setChecked] = useState(true);

	useEffect(() => {
		setChecked(!!find(attachedBusinessTypes, ["id", businessTypeId]));
	}, [attachedBusinessTypes, businessTypeId, isLoadingAttached]);

	const { mutateAsync: handleAttach, isPending: isPendingAttach } = useMutate({
		key: ["attach"],
		url: "/api/nomenclatures/filters/business-types",
		options: {
			onError: () => {
				toast.error("Ceva nu a mers cum trebuie. Încearcă mai tarziu");
				setChecked(false);
			},
		},
	});

	const { mutateAsync: handleDetach, isPending: isPendingDetach } = useMutate({
		key: ["detach"],
		url: "/api/nomenclatures/filters/business-types",
		method: "DELETE",
		options: {
			onError: () => {
				toast.error("Ceva nu a mers cum trebuie. Încearc mai tarziu");
				setChecked(true);
			},
		},
	});

	const handleCheckbox = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>, businessTypeId: number) => {
			if (e.target.checked) {
				await handleAttach({ filterId, businessTypeId });
			} else {
				await handleDetach({ filterId, businessTypeId });
			}

			await refetchAttached();
		},
		[refetchAttached, handleAttach, filterId, handleDetach]
	);

	const isLoading = isPendingAttach || isPendingDetach || isLoadingAttached;
	const action = !checked ? "Creaază" : "Elimină";

	return (
		<Tooltip title={`${action} relația ${filterName} - ${businessTypeName}`}>
			{!isLoading ? (
				<Checkbox
					checked={checked}
					onChange={e => handleCheckbox(e, Number(businessTypeId))}
					size="small"
				/>
			) : (
				<CircularProgress size={25} />
			)}
		</Tooltip>
	);
}
