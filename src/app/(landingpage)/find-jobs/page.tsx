"use client";

import { CATEGORIES_OPTIONS } from "@/constants";
import ExploreDataContainer from "@/containers/ExploreDataContainer";
// import useCategoryJobFilter from "@/hooks/useCategoryJobFilter";
// import useJobs from "@/hooks/useJobs";
import { formFilterSchema } from "@/lib/form-schema";
import { JobType, filterFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FILTER_FORMS: filterFormType[] = [
  {
    name: "categories",
    label: "Categories",
    items: CATEGORIES_OPTIONS,
  },
];

const dummyData: JobType[] = [
  {
    applicants: 5,
    skills: ["Marketing", "Design"],
    desc: "lorem",
    image: "/images/company2.png",
    jobType: "Full Time",
    location: "Bandung, Indonesia",
    name: "Social Media Assistant",
    needs: 10,
    type: "Agency",
    id: "1",
  },
];

export default function FindJobsPage() {
  const formFilter = useForm<z.infer<typeof formFilterSchema>>({
    resolver: zodResolver(formFilterSchema),
    // kasih default value array kosong agar tidak error
    defaultValues: {
      categories: [],
    },
  });

  // const { filters } = useCategoryJobFilter();

  const [categories, setCategories] = useState<string[]>([]);

  // const { jobs, isLoading, mutate } = useJobs(categories);

  const onSubmitFormFilter = async (val: z.infer<typeof formFilterSchema>) => {
    // setCategories(val.categories);
    console.log(val);
  };

  // useEffect(() => {
  // 	mutate();
  // }, [categories]);

  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFilter={onSubmitFormFilter}
      filterForms={FILTER_FORMS}
      title="dream job"
      subtitle="Find your next career at companies like HubSpot, Nike,
    and Dropbox"
      loading={false}
      type="job"
      data={dummyData}
    />
  );
}
