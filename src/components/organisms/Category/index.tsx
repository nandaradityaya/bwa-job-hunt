"use client";

import { FC, useMemo } from "react";

// import useSWR from "swr";

import TitleSection from "@/components/atoms/TitleSection";
import CategoryItem from "./Categoryitem";
import { fetcher, parsingCategories } from "@/lib/utils";
import { categoryJobType } from "@/types";
import { BiCategory } from "react-icons/bi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

interface CategoryProps {}

const Category: FC<CategoryProps> = ({}) => {
  // const { data, isLoading, error } = useSWR("/api/jobs/categories", fetcher);

  // const categories = useMemo(
  // 	() => parsingCategories(data, isLoading, error),
  // 	[data, isLoading, error]
  // );

  return (
    <div className="mt-32 mb-8">
      <TitleSection word1="Explore by" word2="category" />
      <div className="grid grid-cols-5 gap-9 mt-12">
        {/* {categories.map((item: categoryJobType) => (
					<CategoryItem
						key={item.id}
						name={item.name}
						totalJobs={item.totalJobs}
					/>
				))} */}
        {[0, 1, 2, 3, 4, 5].map((item: number) => (
          <CategoryItem key={item} name={"category"} totalJobs={10} />
        ))}
      </div>
    </div>
  );
};

export default Category;
