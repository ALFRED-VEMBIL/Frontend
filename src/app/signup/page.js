'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock } from 'react-icons/fi';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const res = await fetch('http://localhost:8080/feedspotclone/signup.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.success) {
      alert('✅ Signup successful. Please log in.');
      router.push('/login');
    } else {
      alert('❌ Signup failed: ' + data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row">

        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-10">
          <div className="mb-8">
            <span className="text-blue-600 font-bold text-lg">dotwork</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create your Account</h2>
          <p className="text-sm text-gray-500 mb-6">Start your journey with us today!</p>

          {/* Email Input */}
          <div className="relative mb-4">
            <span className="absolute left-3 top-3.5 text-gray-400">
              <FiMail />
            </span>
            <input
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Sign up
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <span onClick={() => router.push('/login')} className="text-blue-600 hover:underline cursor-pointer">
              Log in
            </span>
          </p>
        </div>

        {/* Right: Illustration */}
        <div className="w-full md:w-1/2 bg-blue-600 flex items-center justify-center text-white px-8 py-12">
          <div className="text-center space-y-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Signup graphic"
              className="w-28 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Start building with us today.</h3>
            <p className="text-sm opacity-80">
              Join thousands using our widgets to grow their online presence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
