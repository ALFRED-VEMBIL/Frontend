'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      router.push('/widgets/create');
    }, 500); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray200  to-zinc-500">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`text-4xl font-bold text-white shadow-lg rounded-2xl px-6 py-4 bg-black/30 backdrop-blur transition-all duration-300
          hover:scale-105 hover:bg-black/50 active:scale-95
          ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'MEOW...^_^' : 'Feedspot Home'}
      </button>
    </div>
  );
}
