import { useEffect, useState } from "react";

// Devine `true` doar dacă `value` rămâne `true` neîntrerupt cel puțin
// `delayMs` — util pentru a ascunde stări tranzitorii foarte scurte
// (ex. un overlay de "pauză" care ar clipi fals cât timp play() e încă
// în curs, înainte să vină evenimentul nativ `playing`). Tranziția spre
// `false` e instantă, fără debounce — doar apariția e întârziată.
export function useDelayedTrue(value: boolean, delayMs: number): boolean {
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    if (!value) {
      setDelayed(false);
      return;
    }

    const timeout = setTimeout(() => setDelayed(true), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return delayed;
}
