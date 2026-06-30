import { useState, useCallback, useMemo } from "react";
import { BookingStepEnum, SelectedBookingItem } from "./BookingModule";
import { AvailableTimeSlot } from "@/ts/models/booking/availability/AvailableTimeSlot";
import {
  Appointment,
  ScrollBookerAppointmentCreate,
} from "@/ts/models/booking/appointment/Appointment";
import { useMutate } from "@/hooks/useHttp";
import { toast } from "react-toastify";
import {
  BusinessServicesWithProducts,
  Product,
} from "@/ts/models/booking/product/Product";
import { SelectedProductType } from "@/components/cutomized/Post/sidebar/ExploreServicesTab";
import { AppRoutes } from "@/utils/routes";
import { BookingFlow } from "@/ts/models/booking/booking/BookingFlow";
import { useAppNavigation } from "@/hooks/useAppNavigation";

type BookingModuleProps = {
  bookingFlow: BookingFlow;
  employeeId: number | null;
  selectedProductId: number | null;
};

export const useBookingState = ({
  bookingFlow,
  employeeId,
  selectedProductId,
}: BookingModuleProps) => {
  const { navigateTo } = useAppNavigation();

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

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    () => employeeId
  );

  const employeeData = useMemo(() => {
    const activeEmp = bookingFlow.employees?.find(
      (e) => e.id === selectedEmployeeId
    );
    return {
      selectedEmployeeId: selectedEmployeeId,
      avatar: activeEmp?.avatar ?? null,
      fullname: activeEmp?.fullname ?? null,
    };
  }, [bookingFlow.employees, selectedEmployeeId]);

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
        navigateTo(AppRoutes.appointmentDetails(appointment.id));
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
    (products: BusinessServicesWithProducts[]) => {
      if (!selectedProductId || products.length === 0) return;

      let foundProduct: Product | undefined;
      for (const group of products) {
        foundProduct = group.products.find((p) => p.id === selectedProductId);
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
    [selectedProductId, handleSelectItem]
  );

  const shouldSkipSpecialistsStep = useMemo(() => {
    return !!selectedEmployeeId || !bookingFlow.business.has_employees;
  }, [selectedEmployeeId, bookingFlow.business.has_employees]);

  const handleNext = useCallback(() => {
    if (currentStep === BookingStepEnum.CONFIRM) {
      if (!selectedTimeSlot || !selectedEmployeeId) return;

      const body: ScrollBookerAppointmentCreate = {
        start_date: selectedTimeSlot.start_date_utc,
        end_date: selectedTimeSlot.end_date_utc,
        payment_currency_id: 1,
        product_variants: selectedItems.map((item) => ({
          id: item.variantId,
          offering: {
            user_id:
              item.offerings.find((o) => o.user.id === selectedEmployeeId)?.user
                .id || selectedEmployeeId,
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
    selectedEmployeeId,
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
        if (selectedEmployeeId === null) return true;
        return selectedItems.some(
          (item) =>
            !item.offerings.find((o) => o.user.id === selectedEmployeeId)
        );
      case BookingStepEnum.DATE_AND_HOUR:
        return selectedTimeSlot === null;
      case BookingStepEnum.CONFIRM:
        return false;
      default:
        return true;
    }
  }, [currentStep, selectedItems, selectedEmployeeId, selectedTimeSlot]);

  return {
    currentStep,
    selectedItems,
    selectedEmployeeId,
    selectedTimeSlot,
    selectedProduct,
    employeeData,
    isNextDisabled,
    isPending,
    setSelectedEmployeeId,
    setSelectedTimeSlot,
    setSelectedProduct,
    handleSelectItem,
    handleDataLoaded,
    handleNext,
    handleBack,
  };
};
