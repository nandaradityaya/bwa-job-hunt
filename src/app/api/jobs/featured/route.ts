import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  // find many artinya get data banyak
  const jobs = await prisma.job.findMany({
    take: 6, // batasi get datanya sebanyak 6 saja
    include: {
      // include itu artinya ambil data relasinya
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
