'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to the App 👋</h1>
      <p>This is the homepage. Choose an action:</p>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={() => router.push('/login')}>Login</button>
        <button onClick={() => router.push('/signup')}>Signup</button>
      </div>
    </div>
  );
}
