import { useEffect, useRef } from "react";

// Ține un ref sincronizat cu ultima valoare a unui prop/state, pentru citire
// sigură în callback-uri/timere care altfel ar închide peste o valoare veche.
export function useLatestRef<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}
