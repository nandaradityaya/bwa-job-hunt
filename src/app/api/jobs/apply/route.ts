import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(request: Request) {
  const data = await request.json(); // ambil jsonnya

  const result = await prisma.applicant.create({
    data, // create data model applicant
  });

  // update jumlah applicant yg sudah apply ke job tersebut (liat di field DB Job)
  await prisma.job.update({
    where: {
      id: data.jobId, // harus pakai jobId jangan id doang
    },
    data: {
      applicants: {
        increment: 1, // tambah 1 (query bawaan prisma)
      },
    },
  });

  return NextResponse.json(result);
}
