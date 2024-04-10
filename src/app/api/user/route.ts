import { hashPassword } from "@/lib/utils";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json(); // ambil request yg di kirim dari body nanti

  const hashedPassword = await hashPassword(body.password); // ambil password dari body (liat console)

  const result = await prisma.user.create({
    data: {
      ...body,
      password: hashedPassword,
    },
  });

  return NextResponse.json(result);
}
