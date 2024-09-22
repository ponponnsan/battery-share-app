import NextAuth from "next-auth";

import { nextAuthOptions } from "@/app/_utils/next-auth-optios";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
