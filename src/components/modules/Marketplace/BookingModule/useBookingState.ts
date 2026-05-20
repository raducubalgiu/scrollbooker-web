import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BookingStepEnum, SelectedBookingItem } from "./BookingModule";
import { AvailableTimeSlot } from "@/ts/models/booking/availability/AvailableTimeSlot";
import {
  Appointment,
  ScrollBookerAppointmentCreate,
} from "@/ts/models/booking/appointment/Appointment";
import { useMutate } from "@/hooks/useHttp";
import { toast } from "react-toastify";
import {
  BusinessProductsResponse,
  Product,
} from "@/ts/models/booking/product/Product";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { BusinessBookingSummary } from "@/ts/models/booking/business/Business";
import { SelectedProductType } from "@/components/cutomized/PostVideo/sidebar/ExploreServicesTab";

type BookingModuleProps = {
  businessId: number;
  businessOwnerId: number;
  employeeId: number | null;
  selectedServiceId: number | null;
  businessEmployees: BusinessEmployee[];
  businessSummary: BusinessBookingSummary;
};

export const useBookingState = ({
  businessOwnerId,
  employeeId,
  selectedServiceId,
  businessEmployees,
  businessSummary,
}: BookingModuleProps) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<BookingStepEnum>(
    BookingStepEnum.SERVICES
  );
  const [selectedItems, setSelectedItems] = useState<SelectedBookingItem[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] =
    useState<AvailableTimeSlot | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<SelectedProductType>({
    product: null,
    open: false,
  });

  // Fix logică: inițializăm ținta corect în funcție de prezența angajaților
  const [targetUserId, setTargetUserId] = useState<number | null>(() => {
    if (employeeId) return employeeId;
    if (!businessSummary.has_employees && businessOwnerId)
      return businessOwnerId;
    return null;
  });

  // Mutat direct din corpul componentei, fiind un calcul pur derivat
  const employeeData = useMemo(() => {
    const activeEmp = businessEmployees?.find((e) => e.id === targetUserId);
    return {
      selectedEmployeeId: targetUserId,
      avatar: activeEmp?.avatar ?? null,
      fullname: activeEmp?.fullname ?? null,
    };
  }, [businessEmployees, targetUserId]);

  const { mutate: handleSaveAppointment, isPending } = useMutate<
    ScrollBookerAppointmentCreate,
    Appointment
  >({
    key: ["create-scrollbooker-appointment"],
    url: "/api/appointments",
    method: "POST",
    options: {
      onSuccess: (appointment: Appointment) => {
        toast.success("Rezervarea ta este confirmată");
        router.push(`/appointments/${appointment.id}`);
      },
    },
  });

  const handleSelectItem = useCallback((item: SelectedBookingItem) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.productId === item.productId);
      if (exists) {
        if (!item.variantId || exists.variantId === item.variantId) {
          return prev.filter((i) => i.productId !== item.productId);
        }
        return prev.map((i) => (i.productId === item.productId ? item : i));
      }
      return [...prev, item];
    });
  }, []);

  const handleDataLoaded = useCallback(
    (businessProducts: BusinessProductsResponse[]) => {
      if (!selectedServiceId || businessProducts.length === 0) return;

      let foundProduct: Product | undefined;
      for (const group of businessProducts) {
        foundProduct = group.products.find((p) => p.id === selectedServiceId);
        if (foundProduct) break;
      }

      if (!foundProduct) return;
      const variantsCount = foundProduct.variants?.length || 0;

      if (variantsCount === 1 && foundProduct.variants[0]) {
        const soleVariant = foundProduct.variants[0];
        handleSelectItem({
          productId: foundProduct.id,
          variantId: soleVariant.id,
          variantDuration: soleVariant.duration,
          offerings: soleVariant.offerings || [],
          productName: foundProduct.name,
          variantName: soleVariant.name,
        });
      } else if (variantsCount > 1) {
        setSelectedProduct({ product: foundProduct, open: true });
      }
    },
    [selectedServiceId, handleSelectItem]
  );

  // Determină dacă pasul de specialiști trebuie omis complet din flow-ul de navigare
  const shouldSkipSpecialistsStep = useMemo(() => {
    return !!employeeId || !businessSummary.has_employees;
  }, [employeeId, businessSummary.has_employees]);

  const handleNext = useCallback(() => {
    if (currentStep === BookingStepEnum.CONFIRM) {
      if (!selectedTimeSlot || !targetUserId) return;

      const body: ScrollBookerAppointmentCreate = {
        start_date: selectedTimeSlot.start_date_utc,
        end_date: selectedTimeSlot.end_date_utc,
        payment_currency_id: 1,
        product_variants: selectedItems.map((item) => ({
          id: item.variantId,
          offering: {
            user_id:
              item.offerings.find((o) => o.user_id === targetUserId)?.user_id ||
              targetUserId,
          },
        })),
      };
      handleSaveAppointment(body);
    } else {
      setCurrentStep((prev) => {
        if (prev === BookingStepEnum.SERVICES && shouldSkipSpecialistsStep) {
          return BookingStepEnum.DATE_AND_HOUR;
        }
        return prev + 1;
      });
    }
  }, [
    currentStep,
    selectedTimeSlot,
    selectedItems,
    targetUserId,
    shouldSkipSpecialistsStep,
    handleSaveAppointment,
  ]);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === BookingStepEnum.DATE_AND_HOUR && shouldSkipSpecialistsStep) {
        return BookingStepEnum.SERVICES;
      }
      return prev - 1;
    });
  }, [shouldSkipSpecialistsStep]);

  const isNextDisabled = useMemo(() => {
    switch (currentStep) {
      case BookingStepEnum.SERVICES:
        return selectedItems.length === 0;
      case BookingStepEnum.SPECIALISTS:
        if (targetUserId === null) return true;
        return selectedItems.some(
          (item) => !item.offerings.find((o) => o.user_id === targetUserId)
        );
      case BookingStepEnum.DATE_AND_HOUR:
        return selectedTimeSlot === null;
      case BookingStepEnum.CONFIRM:
        return false;
      default:
        return true;
    }
  }, [currentStep, selectedItems, targetUserId, selectedTimeSlot]);

  return {
    currentStep,
    selectedItems,
    targetUserId,
    selectedTimeSlot,
    selectedProduct,
    employeeData,
    isNextDisabled,
    isPending,
    setTargetUserId,
    setSelectedTimeSlot,
    setSelectedProduct,
    handleSelectItem,
    handleDataLoaded,
    handleNext,
    handleBack,
  };
};
