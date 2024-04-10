import { Prisma } from "@prisma/client";
import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url); // ambil parameter url

  const filterCategory =
    // ada ga params dengan nama category, klo ada ambil paramsnya dan jika paramsnya memiliki id lebih dari satu maka split dengan tanda koma
    // contoh: /api/jobs/filter?category=id1,id2
    searchParams.get("category") !== ""
      ? searchParams.get("category")?.split(",")
      : [];

  // searching prisma jobWhereInput
  const categoryQuery: Prisma.JobWhereInput =
    filterCategory && filterCategory.length > 0 // ada ga filter catergory yg panjangnya lebih dari 0 (mksdnya adalah lebih dari 0 yaitu user sudah memilih beberapa filter/checkbox maka arraynya lebih dari 0)
      ? {
          CategoryJob: {
            id: {
              in: filterCategory, // in bisa berupa array yg idnya di dalam data [id1, id2] (cek di prisma relation)
            },
          },
        }
      : {};

  const jobs = await prisma.job.findMany({
    where: { ...categoryQuery }, // findMany categoryQuery
    // include itu yg berelasi
    include: {
      CategoryJob: true,
      Company: {
        include: {
          Companyoverview: true,
        },
      },
    },
  });

  return NextResponse.json(jobs);
}
