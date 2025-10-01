'use client';

import { useState, FormEvent } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const userData = {
      fullName,
      email,
      password,
      shippingAddress: {
        country,
        city,
        address,
        postalCode,
        phoneNumber,
      },
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        setError('API URL is not configured. Please contact support.');
        setIsLoading(false);
        return;
      }
      const response = await axios.post(`${apiUrl}/auth/register`, userData);
      if (response.status === 201) {
        setSuccess('Registration successful! You can now log in.');
        // Clear form
        setFullName('');
        setEmail('');
        setPassword('');
        setCountry('');
        setCity('');
        setAddress('');
        setPostalCode('');
        setPhoneNumber('');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Create your Account</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Personal Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="input-field"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="password-register"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="input-field"
                placeholder="Password (min. 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Shipping Address</h2>
             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input name="country" type="text" required className="input-field" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                <input name="city" type="text" required className="input-field" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <input name="address" type="text" required className="input-field" placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input name="postalCode" type="text" required className="input-field" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                <input name="phoneNumber" type="tel" required className="input-field" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          {error && <p className="mt-2 text-sm text-center text-red-600 dark:text-red-400">{error}</p>}
          {success && <p className="mt-2 text-sm text-center text-green-600 dark:text-green-400">{success}</p>}
        </form>
      </div>
      <style jsx>{`
        .input-field {
          position: relative;
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          color: #111827;
          background-color: #f9fafb;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          transition: border-color 0.2s;
        }
        .dark .input-field {
          color: #e5e7eb;
          background-color: #374151;
          border-color: #4b5563;
        }
        .input-field:focus {
          outline: none;
          border-color: #4f46e5;
          --tw-ring-color: #4f46e5;
          box-shadow: 0 0 0 2px var(--tw-ring-color);
        }
      `}</style>
    </div>
  );
}