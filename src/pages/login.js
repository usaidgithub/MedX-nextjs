import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignInForm() {
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/check-auth');
        if (res.ok) {
          router.push('/home');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
    checkAuth();
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Login successful!');
        router.push('/home');
      } else {
        setMessage(`❌ ${data.message || 'Login failed.'}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('❌ An error occurred during login. Please try again.');
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center dark:bg-gray-900">
      <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full mx-4">
        {/* Left side with brand message and emoji */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center items-center text-center text-white bg-blue-50 dark:bg-blue-900 md:rounded-l-2xl md:rounded-tr-none rounded-t-2xl">
          <div className="text-8xl mb-4 animate-bounce-slow">🩺</div>
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-lg">Connect with your health, instantly.</p>
          <div className="mt-6 space-y-2 text-left text-gray-800 dark:text-gray-200">
            <p className="flex items-center">
              <span className="mr-2 text-xl">🤖</span> AI symptom checker
            </p>
            <p className="flex items-center">
              <span className="mr-2 text-xl">💬</span> Secure authentication
            </p>
            <p className="flex items-center">
              <span className="mr-2 text-xl">🗓️</span> Easy appointment booking
            </p>
          </div>
        </div>

        {/* Right side with the login form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Sign In to MedX
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-xl">
                  📧
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-xl">
                  🔑
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
            </div>
            {/* "Remember me" and "Forgot password" section */}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
              <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                Forgot password?
              </a>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors duration-200"
            >
              Sign In to Your Account ➡️
            </button>
            {/* Register Link */}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
              Don’t have an account yet?{' '}
              <Link href="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                Sign up
              </Link>
            </p>
          </form>
          {/* Display messages */}
          {message && (
            <p className={`text-center mt-4 text-sm font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}