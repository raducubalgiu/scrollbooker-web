"use client";

import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { every } from "lodash";
import { toast } from "react-toastify";
import ListItemChip from "@/components/core/ListItems/ListItemChip";
import Accordion from "@/components/core/Accordion/Accordion";
import MyBusinessModalServices from "./MyBusinessModalServices";
import Modal from "@/components/core/Modal/Modal";
import { useMutate } from "@/hooks/useHttp";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";

const styles = {
	box: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		listStyle: "none",
		p: 0.5,
		m: 0,
	},
};

type MyBusinessServicesProps = {
	services: ServiceType[];
	savedServices: ServiceType[];
	businessId: number;
};

type DeleteModal = {
	open: boolean;
	serviceId: number | null;
};

export default function MyBusinessServices({
	services,
	savedServices,
	businessId,
}: MyBusinessServicesProps) {
	const [open, setOpen] = useState(false);
	const [deleteModal, setDeleteModal] = useState<DeleteModal>({
		open: false,
		serviceId: null,
	});
	const methods = useForm({ defaultValues: { services } });
	const { watch, reset } = methods;
	const allServices = watch("services");

	const { mutate: deleteService, isPending } = useMutate({
		key: ["delete-service"],
		url: "/api/my-business/services",
		method: "DELETE",
		options: {
			onSuccess: () => {
				toast.success(`Ai eliminat cu succes serviciul dorit`);
				reset({
					services: allServices.filter(
						serv => serv.id !== deleteModal.serviceId
					),
				});
				setDeleteModal({ open: false, serviceId: null });
			},
			onError: () => {
				setDeleteModal({ open: false, serviceId: null });
				toast.error("Ceva nu a mers cum trebuie. Incearcă mai tarziu.");
			},
		},
	});

	const handleDelete = () =>
		deleteService({ businessId, serviceId: deleteModal.serviceId });

	const confirmModalActions: ActionButtonType[] = [
		{
			title: "NU",
			props: {
				color: "inherit",
				onClick: () => setDeleteModal({ open: false, serviceId: null }),
			},
		},
		{
			title: "DA",
			props: { onClick: handleDelete, loading: isPending, color: "secondary" },
		},
	];

	const chipColor = (serviceId: number) =>
		serviceId === deleteModal.serviceId ? "secondary" : "primary";

	return (
		<>
			<FormProvider {...methods}>
				<MyBusinessModalServices
					businessId={businessId}
					allServices={allServices}
					savedServices={savedServices}
					open={open}
					handleClose={() => setOpen(false)}
				/>
				<Modal
					actions={confirmModalActions}
					open={deleteModal.open}
					handleClose={() => setDeleteModal({ open: false, serviceId: null })}
				>
					<Typography>
						Ești sigur că dorești să elimini acest serviciu?
					</Typography>
				</Modal>
				<Accordion title="Serviciile mele">
					<Stack alignItems="flex-end">
						<Button variant="contained" onClick={() => setOpen(true)}>
							Adaugă
						</Button>
					</Stack>
					<Box sx={styles.box} component="ul">
						{allServices?.map(service => {
							if (service.isSelected) {
								return (
									<ListItemChip
										color={chipColor(service.id)}
										key={service.id}
										label={service.name}
										onDelete={() =>
											setDeleteModal({ open: true, serviceId: service.id })
										}
									/>
								);
							}
						})}
						{every(allServices, { isSelected: false }) && (
							<Typography>Încă nu ai adăugat servicii</Typography>
						)}
					</Box>
				</Accordion>
			</FormProvider>
		</>
	);
}
