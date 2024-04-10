import { fetcher, parsingJobs } from "@/lib/utils";
import { JobType } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

const JOB_PATH = "/api/jobs/filter";

const useJobs = (filter?: string[]) => {
  const paramsCategory = useMemo(() => {
    // jika filternya lebih dari 0 maka join dengan koma "," | biar hasilnya seperti ini /api/jobs/filter?category=id1,id2
    if (filter && filter.length > 0) {
      return filter.join(",");
    }

    return ""; // klo dia ga masuk dalam kondisi diatas maka return string kosong saja
  }, [filter]);

  // contoh: /api/jobs/filter?category=id1, | mutate itu supaya APInya bisa kita hit lagi sehingga kita bisa dapet data baru
  const { data, error, isLoading, mutate } = useSWR(
    `${JOB_PATH}?category=${paramsCategory}`,
    fetcher,
    { revalidateOnMount: false } // revalidateOnMount yaitu untuk ngevalidate sekali saja yaitu ketika si useEffect berubah menggunakan mutate yg ada di page.tsx findJobs
  );

  const [jobs, setJobs] = useState<JobType[]>([]);

  const parseJobs = useCallback(async () => {
    const parseData = await parsingJobs(data, isLoading, error);
    setJobs(parseData);
  }, [data, isLoading, error]);

  // useEffect supaya parseJobsnya jalan
  useEffect(() => {
    parseJobs();
  }, [data, isLoading, error]);

  return {
    jobs,
    mutate,
    isLoading,
  };
};

export default useJobs;
