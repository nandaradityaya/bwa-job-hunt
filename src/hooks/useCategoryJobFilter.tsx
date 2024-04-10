import { fetcher, parsingCategoriesToOptions } from "@/lib/utils";
import { filterFormType } from "@/types";
import { useMemo } from "react";
import useSWR from "swr";

const useCategoryJobFilter = () => {
  const { data, error, isLoading } = useSWR("/api/jobs/categories", fetcher);

  console.log("data");
  console.log(data);

  // pake useMemo agar tidak di render berulang2, jadi di render ketika data, isLoading, & errornya berubah
  const categories = useMemo(
    () => parsingCategoriesToOptions(data, isLoading, error),
    [data, error, isLoading]
  );

  // clg ini sudah di parsing jadi datanya cuma id & label
  // console.log("categories");
  // console.log(categories);

  const filters = useMemo(() => {
    return [
      {
        name: "categories", // namenya sesuaiin dengan formFilterSchema yg ada di form-schema.ts
        label: "Categories",
        items: categories,
      },
    ] as filterFormType[];
  }, [categories]);

  return {
    filters,
  };
};

export default useCategoryJobFilter;
