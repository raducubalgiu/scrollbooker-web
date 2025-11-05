import React, { useCallback, useEffect, useState } from "react";
import { Tooltip, Checkbox, CircularProgress } from "@mui/material";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { MRT_Row } from "material-react-table";
import { includes } from "lodash";
import { FilterType } from "@/ts/models/nomenclatures/FilterType";

type ServiceFilterTypeCheckboxProps = {
	row: MRT_Row<FilterType>;
	serviceId: number | undefined;
	serviceName: string;
    isExpanded: boolean
};

type ServiceFilterRelationType = {
    service_id: number,
    filter_id: number;
}

export default function ServiceFilterCheckbox({
	row,
	serviceId,
	serviceName,
    isExpanded
}: ServiceFilterTypeCheckboxProps) {
    const filterId = row.original.id

	const {
		data: attachedFilters,
		isLoading: isLoadingAttached,
		refetch: refetchAttached,
	} = useCustomQuery<ServiceFilterRelationType[]>({
		key: ["service-filters", serviceId, filterId, isExpanded],
		url: "/api/nomenclatures/services/filters",
		params: { serviceId, filterId },
        options: { enabled: isExpanded }
	});

	const [checked, setChecked] = useState(true);

	useEffect(() => {
        const filterIds = attachedFilters?.map(f => f.filter_id)
        setChecked(includes(filterIds, row.original.id))
	}, [attachedFilters, row.original.id, isLoadingAttached]);

	const { mutateAsync: handleAttach, isPending: isPendingAttach } = useMutate({
		key: ["attach-filters"],
		url: "/api/nomenclatures/services/filters",
		options: {
			onError: () => setChecked(false),
		},
	});

	const { mutateAsync: handleDetach, isPending: isPendingDetach } = useMutate({
		key: ["detach-filters"],
		url: "/api/nomenclatures/services/filters",
		method: "DELETE",
		options: {
			onError: () => setChecked(true),
		},
	});

	const handleCheckbox = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>, filterId: number) => {
			if (e.target.checked) {
				await handleAttach({ serviceId, filterId });
			} else {
				await handleDetach({ serviceId, filterId });
			}

			await refetchAttached();
		},
		[refetchAttached, handleAttach, serviceId, handleDetach]
	);

	const isLoading = isPendingAttach || isPendingDetach || isLoadingAttached;
	const action = !checked ? "Creează" : "Elimină";

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
