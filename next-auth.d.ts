// seting next auth supaya modulenya bisa ke baca
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: { id: any } & DefaultSession["user"]; // default session dari user
  }
}
