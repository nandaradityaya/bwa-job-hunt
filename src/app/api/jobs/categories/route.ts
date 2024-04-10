import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  // ambil categoryJob untuk tiap2 category sehingga dia findMany
  const categories = await prisma.categoryJob.findMany({
    include: {
      _count: {
        select: { Job: true }, // select relasinya yaitu Job
      },
    },
  });

  return NextResponse.json(categories);
}
