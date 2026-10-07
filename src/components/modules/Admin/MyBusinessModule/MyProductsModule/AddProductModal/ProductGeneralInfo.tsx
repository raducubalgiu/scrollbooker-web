import Input from "@/components/core/Input/Input";
import InputSelect from "@/components/core/Input/InputSelect";
import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useGetFiltersByService } from "@/controllers/nomenclature/filter.controller";
import { FormProductFilter } from "./AddProductModal";

type ProductGeneralInfoProps = {
  selectedDomainId: string;
  serviceDomainServices: SelectedServiceDomainWithServices[];
};

const ProductGeneralInfo = ({
  selectedDomainId,
  serviceDomainServices,
}: ProductGeneralInfoProps) => {
  const { setValue, watch } = useFormContext();
  const selectedServiceId = watch("serviceId");

  const isRequired = required();
  const nameMinLength = minField(3);
  const nameMaxLength = maxField(100);

  const { data: filters } = useGetFiltersByService({
    serviceId: selectedServiceId,
    isEnabled: !!selectedServiceId,
  });

  useEffect(() => {
    if (filters) {
      const initialFormFilters: FormProductFilter[] = filters.map((f) => ({
        filter_id: f.id,
        value: f.single_select ? "" : [],
      }));

      setValue("filters", initialFormFilters);
    } else {
      setValue("filters", []);
    }
  }, [filters, setValue]);

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

        {!!filters?.length && (
          <Box sx={{ py: 2 }}>
            <Typography variant="h6" mb={3} fontWeight="600">
              Filtre pentru acest serviciu
            </Typography>

            <Stack spacing={2.5}>
              {filters.map((filter, fIndex) => (
                <InputSelect
                  key={filter.id}
                  name={`filters.${fIndex}.value`}
                  label={filter.name}
                  options={filter.sub_filters.map((sf) => ({
                    value: sf.id.toString(),
                    name: sf.name,
                  }))}
                  multiple={!filter.single_select}
                />
              ))}
            </Stack>
          </Box>
        )}
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
    bgcolor: "background.default",
  },
};
