"use client"
import React, { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSolanaAccount = async () => {
      console.log("session:", session.user.id)
      if (status === "authenticated" && session?.user?.id) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/solana/setup?userId=${session.user.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.publicKey) {
              router.push("/request-delivery");
            } else {
              // Solanaアカウントがない場合、作成プロセスを開始
              await createSolanaAccount(session.user.id);
            }
          } else {
            throw new Error('Failed to check Solana account');
          }
        } catch (error) {
          console.error('Error checking Solana account:', error);
          toast.error('Failed to check Solana account. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    checkSolanaAccount();
  }, [session, status, router]);

  const createSolanaAccount = async (userId: string) => {
    try {
      const response = await fetch('/api/solana/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create Solana account');
      }

      const data = await response.json();
      console.log('Solana Account Public Key:', data.publicKey);
      toast.success('Solana account created successfully!');
      router.push('/request-delivery');
    } catch (error) {
      console.error('Error creating Solana account:', error);
      toast.error('Failed to create Solana account. Please try again.');
    }
  };

  const handleGmailLogin = (provider: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    const result = await signIn(provider);
    setIsLoading(true);

    try {
      const result = await signIn("google", { redirect: false });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {

        toast.success('Login successful!');
      }
    } catch (error) {
      console.error('Error during login process:', error);
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <h2 className="text-xl font-bold flex-grow">Welcome to Commute Cargo!</h2>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-center my-6">
          <img src="/api/placeholder/120/120" alt="Commute Cargo Logo" className="w-30 h-30" />
        </div>
        <div className="mt-6">
          <Button
            onClick={handleGmailLogin}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center justify-center"
          >
            <img src="/api/placeholder/20/20" alt="Gmail" className="w-5 h-5 mr-2" />
            {isLoading ? 'Processing...' : 'Continue with Gmail'}
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
