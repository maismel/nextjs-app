import { useState, useMemo } from "react";

export type SortOrder = "asc" | "desc";

export function useSortTable<T extends object>(
  data: T[],
  defaultSortKey: keyof T,
) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof T>(defaultSortKey);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (key: keyof T) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const processedData = useMemo(() => {
    const filtered = data.filter((item) =>
      Object.values(item).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(search.toLowerCase()),
      ),
    );

    filtered.sort((a, b) => {
      const aVal = a[sortBy] as unknown as string;
      const bVal = b[sortBy] as unknown as string;

      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });

    return filtered;
  }, [data, search, sortBy, sortOrder]);

  return { processedData, search, setSearch, sortBy, sortOrder, handleSort };
}
