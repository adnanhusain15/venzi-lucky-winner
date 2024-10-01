'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [forms, setForms] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('typeformAccessToken');
    if (token) {
      setAccessToken(token);
      fetchForms(token);
    }

    // Check for access token in URL (after OAuth redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('access_token');
    if (tokenFromUrl) {
      setAccessToken(tokenFromUrl);
      localStorage.setItem('typeformAccessToken', tokenFromUrl);
      fetchForms(tokenFromUrl);
      // Clear the URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleConnectTypeform = () => {
    // Redirect to our OAuth route
    router.push('/api/oauth');
  };

  const fetchForms = async (token: string) => {
    try {
      const response = await fetch('/api/typeform/forms', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch forms');
      }
      const data = await response.json();
      setForms(data.items || []);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Typeform Winner Selector</h1>
      {!accessToken ? (
        <button
          onClick={handleConnectTypeform}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect to Typeform
        </button>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Forms:</h2>
          <ul>
            {forms.map((form) => (
              <li key={form.id}>{form.title}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}