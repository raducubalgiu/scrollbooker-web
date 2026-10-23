import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useSearchUsers } from "@/controllers/search/search.controller";

export const useSearchUsersQuery = () => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const debouncedSetValue = useMemo(
    () => debounce((next: string) => setDebouncedValue(next), 400),
    []
  );

  useEffect(() => {
    debouncedSetValue(value);
    return () => debouncedSetValue.cancel();
  }, [value, debouncedSetValue]);

  const {
    data: users = [],
    isLoading,
    isFetching,
  } = useSearchUsers({
    query: debouncedValue.trim().length >= 2 ? debouncedValue : "",
  });

  return {
    value,
    setValue,
    users,
    loading: isLoading || isFetching,
  };
};
