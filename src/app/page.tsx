import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import CalendarModule from "@/components/modules/CalendarModule/CalendarModule";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { CalendarEventsProvider } from "@/providers/CalendarEventsProvider";
import { useCallback } from "react";
import dayjs from "dayjs";

async function Calendar() {
  const timeSlots = useCallback(() => {
    const slots = [];
    let current = dayjs("2025-12-16T09:00:00");
    const end = dayjs("2025-12-16T18:00:00");

    while (current.isBefore(end)) {
      const next = current.add(60, "minute");

      if (next.isAfter(end)) {
        const diff = next.diff(end, "minute");
        const newNext = current.add(diff, "minute");

        slots.push({
          start: current.format("HH:mm"),
          end: newNext.format("HH:mm"),
          height: 60 - diff,
          isShortSlot: true,
        });
        break;
      }
      slots.push({
        start: current.format("HH:mm"),
        end: next.format("HH:mm"),
        height: 60,
        isShortSlot: false,
      });

      current = next;
    }

    return slots;
  }, []);

  console.log("TIMESLOTS!!!", timeSlots());

  return (
    <CalendarEventsProvider>
      <CalendarModule />
    </CalendarEventsProvider>
  );
}

export default ProtectedPage(Calendar, PermissionEnum.MY_CALENDAR_VIEW);
