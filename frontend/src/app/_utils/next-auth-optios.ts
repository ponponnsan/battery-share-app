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
    jwt: async ({ token, user, account }) => {
      // 注意: トークンをログ出力してはダメです。
      console.log("in jwt", { user, token, account });

      if (user) {
        token.user = {
          id: user.id || user.sub || "", // user.idがない場合、user.subを使用
          // 他の必要なユーザー情報を追加
        };
        const u = user as any;
        token.role = u.role || ""; // roleがある場合、トークンに設定
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: ({ session, token }) => {
      console.log("in session", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.user?.id || "", // JWTからidを設定
          role: token.role || "", // 役割を追加
        },
        accessToken: token.accessToken || "", // アクセストークンをセッションに追加
      };
    },
  },
};