import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/check-auth');
        if (res.ok) {
          router.push('/chatbot');
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

    if (form.password !== form.confirmPassword) {
      setMessage('❌ Passwords do not match!');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Registered successfully!');
        router.push('/chatbot');
      } else {
        setMessage(`❌ ${data.message || 'Registration failed.'}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('❌ An error occurred during registration. Please try again.');
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center dark:bg-gray-900">
      <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full mx-4">
        {/* Left side with brand message and emoji */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center items-center text-center text-white bg-blue-50 dark:bg-blue-900 md:rounded-l-2xl md:rounded-tr-none rounded-t-2xl">
          <div className="text-8xl mb-4 animate-bounce-slow">🩺</div>
          <h2 className="text-3xl font-bold mb-2">Welcome to MedX!</h2>
          <p className="text-lg">Your health journey, simplified.</p>
          <div className="mt-6 space-y-2 text-left text-gray-800 dark:text-gray-200">
            <p className="flex items-center">
              <span className="mr-2 text-xl">✨</span> Instant AI medical assistance
            </p>
            <p className="flex items-center">
              <span className="mr-2 text-xl">📞</span> Seamless doctor-patient connectivity
            </p>
            <p className="flex items-center">
              <span className="mr-2 text-xl">🔒</span> Your data, securely protected
            </p>
          </div>
        </div>

        {/* Right side with the registration form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Create a MedX Account
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-xl">
                  👤
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
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
            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-xl">
                  🔒
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
            </div>
            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                  I accept the{' '}
                  <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors duration-200"
            >
              Create My Account 
            </button>
            {/* Login Link */}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                Login here
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