'use client';
import { Genome } from '@/types/genome';
import { useEffect, useState } from 'react';

type METHODS = 'GET' | 'POST';

interface UseFetchOptions {
  method?: METHODS;
  body?: Record<string, unknown>;
}

export default function useFetch(url: string, options: UseFetchOptions = {}) {
  const { method = 'GET', body } = options;
  const [profile, setProfile] = useState<Genome | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchOptions: RequestInit = {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
        };

        if (method === 'POST' && body) {
          fetchOptions.body = JSON.stringify(body);
        }

        const res = await fetch(url, fetchOptions);

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();

        setProfile(data);
      } catch (err) {
        console.error('Fetch error:', err);

        const errorMessage =
          err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { profile, error };
}
