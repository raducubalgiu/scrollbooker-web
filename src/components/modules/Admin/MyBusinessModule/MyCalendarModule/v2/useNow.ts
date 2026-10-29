"use client";

import { useEffect, useState } from "react";

const MINUTE_MS = 60_000;

export const useNow = () => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      setNow(Date.now());
      interval = setInterval(() => setNow(Date.now()), MINUTE_MS);
    }, MINUTE_MS - (Date.now() % MINUTE_MS));

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return now;
};

export const isInFuture = (utc: string) => new Date(utc).getTime() > Date.now();
