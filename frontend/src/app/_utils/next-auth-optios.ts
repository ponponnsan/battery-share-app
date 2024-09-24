import GoogleProvider from "next-auth/providers/google";

import type { NextAuthOptions } from "next-auth";

export const nextAuthOptions: NextAuthOptions = {
  debug: true,
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      // 注意: トークンをログ出力してはダメです。
      console.log("in jwt", { user, token, account, profile });

      if (user) {
        token.user = {
          id: user.id,
          // 他の必要なユーザー情報
        };
        // @ts-ignore: ユーザーオブジェクトにroleプロパティがある場合
        if (user.role) {
          token.role = user.role;
        }
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // セッションコールバック
      if (session?.user && token.user) {
        session.user.id = token.user.id;
        // 他の必要なユーザー情報を追加
        if (token.role) {
          session.user.role = token.role;
        }
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};
