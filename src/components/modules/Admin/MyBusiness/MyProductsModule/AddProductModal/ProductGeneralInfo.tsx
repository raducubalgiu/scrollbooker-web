import Input from "@/components/core/Input/Input";
import InputSelect from "@/components/core/Input/InputSelect";
import { useCustomQuery } from "@/hooks/useHttp";
import {
  getProductTypeLabel,
  ProductTypeEnum,
} from "@/ts/enums/ProductTypeEnum";
import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Box, Checkbox, Divider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useMemo } from "react";

type ProductGeneralInfoProps = {
  selectedDomainId: string;
};

const ProductGeneralInfo = ({ selectedDomainId }: ProductGeneralInfoProps) => {
  const isRequired = required();
  const nameMinLength = minField(3);
  const nameMaxLength = maxField(100);

  const { data: serviceDomainServices } = useCustomQuery<
    SelectedServiceDomainWithServices[]
  >({
    key: "my-services",
    url: "/api/my-services",
  });

  const validDomains = useMemo(() => {
    if (!serviceDomainServices) return [];

    return serviceDomainServices.filter((domain) =>
      domain.services.some((s) => s.is_selected === true)
    );
  }, [serviceDomainServices]);

  const domainOptions = useMemo(
    () =>
      validDomains.map((d) => ({
        value: d.id.toString(),
        name: d.name,
      })),
    [validDomains]
  );

  const serviceOptions = useMemo(() => {
    if (!selectedDomainId || !validDomains.length) return [];

    const domain = validDomains.find((d) => d.id === Number(selectedDomainId));

    if (!domain) return [];

    return domain.services
      .filter((s) => s.is_selected)
      .map((s) => ({
        value: s.id.toString(),
        name: s.name,
      }));
  }, [selectedDomainId, validDomains]);

  return (
    <Grid size={{ xs: 12, md: 4 }} sx={styles.container}>
      <Typography variant="h6" mb={3} fontWeight="600">
        Informații Generale
      </Typography>

      <Stack spacing={2.5}>
        <InputSelect
          name="type"
          label="Tip serviciu"
          options={ProductTypeEnum.all.map((type) => ({
            value: type,
            name: getProductTypeLabel(type),
          }))}
          rules={isRequired}
        />
        <InputSelect
          name="serviceDomainId"
          label="Categoria"
          options={domainOptions}
          rules={isRequired}
        />
        <InputSelect
          name="serviceId"
          label="Serviciu"
          options={serviceOptions}
          rules={isRequired}
        />

        <Input
          name="name"
          label="Nume Serviciu"
          placeholder="ex. Tuns"
          rules={{ ...isRequired, ...nameMinLength, ...nameMaxLength }}
        />

        <Input name="description" label="Descriere" multiline rows={3} />

        <Box sx={{ p: 2, borderRadius: 3, bgcolor: "action.hover" }}>
          <Typography variant="subtitle2" mb={1} fontWeight="700">
            Filtre Rapide
          </Typography>
          <Input name="genre" label="Gen" />
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight="700">
              Rezervabil online
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Permite clienților să programeze instant.
            </Typography>
          </Box>
          <Checkbox checked />
        </Box>
      </Stack>
    </Grid>
  );
};

export default ProductGeneralInfo;

const styles = {
  container: {
    borderRight: "1px solid",
    borderColor: "divider",
    height: "100%",
    overflowY: "auto",
    p: 4,
    bgcolor: "background.paper",
  },
};
