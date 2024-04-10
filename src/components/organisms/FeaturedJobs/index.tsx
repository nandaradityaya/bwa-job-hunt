import { FC } from "react";

import TitleSection from "@/components/atoms/TitleSection";
import JobItem from "./JobItem";

import useFeaturedJobs from "@/hooks/useFeaturedJobs";
import { JobType } from "@/types";

interface FeaturedJobsProps {}

const FeaturedJobs: FC<FeaturedJobsProps> = ({}) => {
  const { jobs, isLoading, error } = useFeaturedJobs();

  return (
    <div className="mt-32 mb-10">
      <TitleSection word1="Featured" word2="jobs" />
      <div className="grid grid-cols-4 gap-8 mt-12">
        {jobs.map((item: JobType) => (
          <JobItem key={item.id} {...item} />
        ))}

        {/* {[0, 1, 2].map((item: number) => (
          <JobItem
            key={item}
            image="/images/company.png"
            jobType="Full Time"
            name="Front-end Developer"
            type="IT Consultant"
            location="Jakarta, Indonesia"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eius repellat accusamus quisquam labore assumenda, distinctio id tempora illo velit soluta at eos facilis, est facere error nostrum cum voluptate."
            skills={["Design", "Front-end"]}
            category={{
              id: "",
              name: "",
              totalJobs: 0,
            }}
            id={""}
            needs={0}
            applicants={0}
          />
        ))} */}
      </div>
    </div>
  );
};

export default FeaturedJobs;
