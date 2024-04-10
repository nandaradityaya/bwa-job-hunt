"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

// buat ini untuk kita gunain data sessionnya untuk client side
export default function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
