'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';

import { FiMail, FiLock } from 'react-icons/fi';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { refreshAuth } = useAuth();

  const handleLogin = async () => {
    const res = await fetch('http://localhost:8080/feedspotclone/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      await refreshAuth(); // re-check authentication
      router.push('/widgets');
    } else {
      alert('❌ Login failed: ' + data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row">

        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-10">

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Log in to your Account</h2>
          <p className="text-sm text-gray-500 mb-6">Welcome back! Select method to log in:</p>

          {/* Username Input (labeled Email for UI only) */}
          <div className="relative mb-4">
            <span className="absolute left-3 top-3.5 text-gray-400">
              <FiMail />
            </span>
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-4">
            <span className="absolute left-3 top-3.5 text-gray-400">
              <FiLock />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-cyan-700 hover:underline">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-2 rounded-md transition"
          >
            Log in
          </button>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{' '}
            <span onClick={() => router.push('/signup')} className="text-cyan-700 hover:underline cursor-pointer">
              Create an account
            </span>
          </p>
        </div>

        {/* Right: Illustration */}
        <div className="w-full md:w-1/2 bg-cyan-700 flex items-center justify-center text-white px-8 py-12">
          <div className="text-center space-y-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
              alt="Dashboard illustration"
              className="w-28 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Connect with every application.</h3>
            <p className="text-sm opacity-80">
              Everything you need in an easily customizable dashboard.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
