"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function NextAuthProvider({
  children,
  session, // セッションをプロパティとして受け取るように修正
}: {
  children: ReactNode;
  session: any; // session の型を適切に指定する（通常は any で問題ないですが、型が分かる場合は指定可能）
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
