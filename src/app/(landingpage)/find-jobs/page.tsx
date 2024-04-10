"use client";

import { CATEGORIES_OPTIONS } from "@/constants";
import ExploreDataContainer from "@/containers/ExploreDataContainer";
import useCategoryJobFilter from "@/hooks/useCategoryJobFilter";
import useJobs from "@/hooks/useJobs";
import { formFilterSchema } from "@/lib/form-schema";
import { JobType, filterFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FindJobsPage() {
  const formFilter = useForm<z.infer<typeof formFilterSchema>>({
    resolver: zodResolver(formFilterSchema),
    // kasih default value array kosong agar tidak error
    defaultValues: {
      categories: [],
    },
  });

  const [categories, setCategories] = useState<string[]>([]);
  const { filters } = useCategoryJobFilter();
  const { jobs, isLoading, mutate } = useJobs(categories);

  const onSubmitFormFilter = async (val: z.infer<typeof formFilterSchema>) => {
    setCategories(val.categories); // setCategoriesnya pake value dari categories yg di ceklis oleh user
  };

  useEffect(() => {
    mutate();
  }, [categories]); // klo categories berubah maka kita mutate atau hit lagi APInya untuk update datanya

  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFilter={onSubmitFormFilter}
      filterForms={filters}
      title="dream job"
      subtitle="Find your next career at companies like HubSpot, Nike,
    and Dropbox"
      loading={isLoading}
      type="job"
      data={jobs}
    />
  );
}
