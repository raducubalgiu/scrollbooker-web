"use client";

import React, { useState } from "react";
import Accordion from "../../core/Accordion/Accordion";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { FormProvider, useForm } from "react-hook-form";
import MyBusinessModalServices from "./MyBusinessModalServices";
import { every } from "lodash";
import Modal from "@/components/core/Modal/Modal";
import { useMutate } from "@/hooks/useHttp";
import { toast } from "react-toastify";

const ListItem = styled("li")(({ theme }) => ({
	margin: theme.spacing(1),
}));

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
				toast.error("Ceva nu a mers cum trebuie. Incearca mai tarziu.");
			},
		},
	});

	const handleDelete = () =>
		deleteService({ businessId, serviceId: deleteModal.serviceId });

	const styles = {
		box: {
			display: "flex",
			justifyContent: "center",
			flexWrap: "wrap",
			listStyle: "none",
			p: 0.5,
			m: 0,
		},
		chip: {
			py: 2.5,
			px: 1,
			fontSize: 15.5,
			color: "white",
			fontWeight: "600",
		},
	};
	return (
		<>
			<FormProvider {...methods}>
				<MyBusinessModalServices
					allServices={allServices}
					savedServices={savedServices}
					open={open}
					handleClose={() => {
						reset();
						setOpen(false);
					}}
				/>
				<Modal
					actions={[
						{
							title: "NU",
							props: {
								color: "inherit",
								onClick: () => setDeleteModal({ open: false, serviceId: null }),
							},
						},
						{
							title: "DA",
							props: { onClick: handleDelete, loading: isPending },
						},
					]}
					open={deleteModal.open}
					handleClose={() => setDeleteModal({ open: false, serviceId: null })}
				>
					<Typography>
						Esti sigur ca doresti sa elimini acest serviciu?
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
									<ListItem key={service.id}>
										<Chip
											label={service.name}
											onDelete={() =>
												setDeleteModal({ open: true, serviceId: service.id })
											}
											size="medium"
											sx={styles.chip}
											color="primary"
										/>
									</ListItem>
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
