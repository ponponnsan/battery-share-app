"use client";

import React, { useEffect } from "react";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import * as web3 from '@solana/web3.js';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      handleAuthenticatedUser();
    }
  }, [session, status, router]);

  const handleAuthenticatedUser = async () => {
    const userData = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image
    };

    // ローカルストレージからユーザー情報を取得
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      // 新規ユーザーの場合、Solanaアカウントを発行
      const solanaAccount = await createSolanaAccount();
      
      // ユーザー情報とSolanaアカウント情報をローカルストレージに保存
      const userDataWithSolana = {
        ...userData,
        solanaPublicKey: solanaAccount.publicKey.toString(),
        solanaPrivateKey: Array.from(solanaAccount.secretKey) // Uint8Arrayを通常の配列に変換
      };
      localStorage.setItem('userData', JSON.stringify(userDataWithSolana));
      
      console.log('New Solana account created and stored');
    } else {
      console.log('Existing user data found in local storage');
      // 既存のユーザーデータを更新（必要に応じて）
      const existingData = JSON.parse(storedUserData);
      const updatedData = { ...existingData, ...userData };
      localStorage.setItem('userData', JSON.stringify(updatedData));
    }
    
    // TOPページにリダイレクト
    router.push("/request-delivery");
  };

  const createSolanaAccount = async () => {
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
    const account = web3.Keypair.generate();
    
    try {
      // airdropリクエストを1回だけ試行
      // ただ、(Too Many Requests)は依然としてエラーは発生しているが、動いているのでよしとしている。
      const airdropSignature = await connection.requestAirdrop(
        account.publicKey,
        web3.LAMPORTS_PER_SOL
      );
      
      // トランザクションの確認を待つ（タイムアウト付き）
      await connection.confirmTransaction(airdropSignature, 'confirmed');
      console.log('Airdrop successful');
    } catch (error) {
      console.warn('Airdrop failed, but account creation continues:', error);
      // airdropが失敗してもアカウント作成は続行
    }

    return account;
  };


  const handleGmailLogin = (provider: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    const result = await signIn(provider);

    // ログインに成功したらTOPページにリダイレクト
    // if (result) {
    //   router.push("/request-delivery");
    // }
  };



  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <h2 className="text-xl font-bold flex-grow">welcome to Commute Cargo!!</h2>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-center my-6">
          <img src="/api/placeholder/120/120" alt="Commute Cargo Logo" className="w-30 h-30" />
        </div>

        <div className="mt-6">
          <Button
            onClick={handleGmailLogin("google")}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center justify-center"
          >
            <img src="/api/placeholder/20/20" alt="Gmail" className="w-5 h-5 mr-2" />
            Continue with Gmail
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          By continuing, you agree to Commute Cargo's Terms of Service and Privacy Policy.
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
