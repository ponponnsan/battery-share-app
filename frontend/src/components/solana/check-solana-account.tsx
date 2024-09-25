// "use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

const SolanaAccountManager = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [solanaAccount, setSolanaAccount] = useState<{ publicKey: string } | null>(null);

  useEffect(() => {
    const checkSolanaAccount = async () => {
      if (status === 'authenticated' && session?.user?.id) {
        try {
          const response = await fetch(`/api/solana/setup?userId=${session.user.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            console.log('Solana Account Public Key:', data.publicKey);
            setSolanaAccount(data);
            if (data.publicKey) {
              router.push('/request-delivery');
            } else {
              await createSolanaAccount(session.user.id);
            }
          } else {
            throw new Error('Failed to check Solana account');
          }
        } catch (error) {
          console.error('Error checking Solana account:', error);
          toast.error('Failed to check Solana account. Please try again.');
        }
      }
    };

    checkSolanaAccount();
  }, [status, session, router, solanaAccount]);

  const createSolanaAccount = async (userId: string) => {
    try {
      const response = await fetch('/api/solana/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Solana Account Public Key:', data.publicKey);
        setSolanaAccount(data);
        router.push('/request-delivery');
      } else {
        throw new Error('Failed to create Solana account');
      }
    } catch (error) {
      console.error('Error creating Solana account:', error);
      toast.error('Failed to create Solana account. Please try again.');
    }
  };

  if (status === 'authenticated' && solanaAccount?.publicKey) {
    return (
      <div>
        <p>Solana account found: {solanaAccount.publicKey}</p>
        {/* 他のコンポーネントや UI要素を表示する */}
      </div>
    );
  } else if (status === 'authenticated' && !solanaAccount?.publicKey) {
    return (
      <div>
        <p>Creating Solana account...</p>
        {/* ローディング表示や他のコンポーネントを表示する */}
      </div>
    );
  } else {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
};

export default SolanaAccountManager;