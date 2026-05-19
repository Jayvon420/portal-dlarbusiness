// "use client";

// import { useMemo, useState, useEffect } from "react";

// type UseTableOptions<T> = {
//   data: T[];
//   searchFn: (item: T, search: string) => boolean;
//   initialPerPage?: number;
// };

// export function useTable<T>({
//   data,
//   searchFn,
//   initialPerPage = 10,
// }: UseTableOptions<T>) {
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [perPage, setPerPage] = useState(initialPerPage);

//   // FILTER
//   const filtered = useMemo(() => {
//     if (!search) return data;
//     return data.filter((item) => searchFn(item, search.toLowerCase()));
//   }, [data, search, searchFn]);

//   // PAGINATION
//   const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

//   const paginated = useMemo(() => {
//     const start = (page - 1) * perPage;
//     return filtered.slice(start, start + perPage);
//   }, [filtered, page, perPage]);

//   // reset page if data changes
//   useEffect(() => {
//     if (page > totalPages) setPage(1);
//   }, [page, totalPages]);

//   return {
//     search,
//     setSearch,
//     page,
//     setPage,
//     perPage,
//     setPerPage,
//     totalPages,
//     paginated,
//     filtered,
//   };
// }

"use client";

import { useMemo, useState, useEffect } from "react";

type UseTableOptions<T> = {
  data: T[];
  searchFn: (item: T, search: string) => boolean;
  initialPerPage?: number;
};

export function useTable<T>({
  data,
  searchFn,
  initialPerPage = 10,
}: UseTableOptions<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(initialPerPage);

  /* ---------------- FILTER ---------------- */
  const filtered = useMemo(() => {
    if (!search) return data;
    return data.filter((item) => searchFn(item, search.toLowerCase()));
  }, [data, search, searchFn]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages =
    perPage === -1 ? 1 : Math.max(1, Math.ceil(filtered.length / perPage));

  const paginated = useMemo(() => {
    if (perPage === -1) return filtered;

    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  /* FIX: prevent page overflow */
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  /* reset page when search changes */
  useEffect(() => {
    setPage(1);
  }, [search]);

  return {
    search,
    setSearch,
    page,
    setPage,
    perPage,
    setPerPage,
    totalPages,
    paginated,
    filtered,
  };
}
