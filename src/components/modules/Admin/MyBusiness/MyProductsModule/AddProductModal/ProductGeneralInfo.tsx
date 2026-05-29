import Input from "@/components/core/Input/Input";
import InputSelect from "@/components/core/Input/InputSelect";
import { useCustomQuery } from "@/hooks/useHttp";
import {
  getProductTypeLabel,
  ProductTypeEnum,
} from "@/ts/enums/ProductTypeEnum";
import { Filter } from "@/ts/models/nomenclatures/filter/FilterType";
import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Box, Checkbox, Divider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";
import { FormProductFilter } from "./AddProductModal";
import { useFormContext } from "react-hook-form";
import { FilterTypeEnum, filterTypefromKey } from "@/ts/enums/FilterTypeEnum";
import { isEmpty } from "lodash";

type ProductGeneralInfoProps = {
  open: boolean;
  selectedDomainId: string;
};

const ProductGeneralInfo = ({
  open,
  selectedDomainId,
}: ProductGeneralInfoProps) => {
  const { setValue, watch } = useFormContext();
  const selectedServiceId = watch("serviceId");

  const { data: session } = useSession();
  const isRequired = required();
  const nameMinLength = minField(3);
  const nameMaxLength = maxField(100);

  const { data: serviceDomainServices, isLoading: isLoadingServices } =
    useCustomQuery<SelectedServiceDomainWithServices[]>({
      key: ["business-services", !!session?.business_id],
      url: `/api/businesses/${session?.business_id}/services`,
      options: {
        enabled: open && !!session?.business_id,
        staleTime: 5 * 60 * 1000,
      },
    });

  const { data: filters } = useCustomQuery<Filter[]>({
    key: ["filters-by-service-id", selectedServiceId],
    url: `/api/nomenclatures/services/${selectedServiceId}/filters`,
    options: {
      enabled: open && !!selectedServiceId,
      staleTime: 5 * 60 * 1000,
    },
  });

  useEffect(() => {
    if (filters) {
      const initialFormFilters: FormProductFilter[] = filters.map((f) => ({
        filter_id: f.id,
        type: filterTypefromKey(f.type) || FilterTypeEnum.OPTIONS,
        value: f.single_select ? "" : [],
        minim: null,
        maxim: null,
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
          isLoading={isLoadingServices}
        />
        <InputSelect
          name="serviceId"
          label="Serviciu"
          options={serviceOptions}
          rules={isRequired}
          isLoading={isLoadingServices}
        />

        <Input
          name="name"
          label="Nume Serviciu"
          placeholder="ex. Tuns"
          rules={{ ...isRequired, ...nameMinLength, ...nameMaxLength }}
        />

        <Input name="description" label="Descriere" multiline rows={3} />

        {!isEmpty(filters) && (
          <Box sx={{ py: 2 }}>
            <Typography variant="h6" mb={3} fontWeight="600">
              Filtre pentru acest serviciu
            </Typography>

            <Stack spacing={2.5}>
              {filters?.map((filter, fIndex) => {
                const currentType = filterTypefromKey(filter.type);
                const subFilterOptions = filter.sub_filters.map((sf) => ({
                  value: sf.id.toString(),
                  name: sf.name,
                }));

                if (currentType === FilterTypeEnum.OPTIONS) {
                  return (
                    <InputSelect
                      key={filter.id}
                      name={`filters.${fIndex}.value`}
                      label={filter.name}
                      options={subFilterOptions}
                      multiple={!filter.single_select}
                    />
                  );
                }

                if (currentType === FilterTypeEnum.NUMERIC) {
                  return (
                    <Input
                      key={filter.id}
                      type="number"
                      name={`filters.${fIndex}.minim`}
                      label={`${filter.name} (Valoare)`}
                    />
                  );
                }

                if (currentType === FilterTypeEnum.RANGE) {
                  return (
                    <Stack
                      key={filter.id}
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >
                      <Typography
                        variant="body2"
                        sx={{ minWidth: 80, fontWeight: "600" }}
                      >
                        {filter.name}:
                      </Typography>
                      <Input
                        type="number"
                        size="small"
                        name={`filters.${fIndex}.minim`}
                        label="Minim"
                      />
                      <Input
                        type="number"
                        size="small"
                        name={`filters.${fIndex}.maxim`}
                        label="Maxim"
                      />
                    </Stack>
                  );
                }

                return null;
              })}
            </Stack>
          </Box>
        )}

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
