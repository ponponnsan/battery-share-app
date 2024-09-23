"use client";

import React, { useEffect } from "react";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // ログイン済みの場合はTOPページにリダイレクト
    if (status === "authenticated") {
      router.push("/request-delivery");
    }
  }, [session, status]);

  const handleGmailLogin = (provider: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    const result = await signIn(provider);

    // ログインに成功したらTOPページにリダイレクト
    if (result?.ok) {
      console.log('Google Authentication successful, setting up Solana account...');

      // Call the Solana setup API
      const response = await fetch('/api/solana/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: result.user?.id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Solana Account Public Key:', data.publicKey);

        // Redirect to the request-delivery page
        router.push('/request-delivery');
      } else {
        console.error('Error setting up Solana account');
      }
    } else {
      console.error('Google sign-in failed');
    }
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
