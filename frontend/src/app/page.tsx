"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SolanaAccountManager from '@/components/solana/check-solana-account';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // セッションの状態がまだ読み込み中であれば何もしない
    if (!session) {
      // ログインしていない場合、ログインページへリダイレクト
      router.push("/login");
    } else {
      // ログインしている場合、リクエストデリバリーページへリダイレクト
      router.push("/request-delivery");
    }
  }, [session, status, router]);

  // セッションの状態がまだ確認できない間は何も表示しない
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <SolanaAccountManager />
    </div>
  );
}

