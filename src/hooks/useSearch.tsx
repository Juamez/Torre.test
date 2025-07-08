import { useState } from 'react';
import { TorreSearchResult } from '@/types/connectivity';

interface Payload {
  query: string;
  limit: number;
  excludeContacts: boolean;
}

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<TorreSearchResult[]>([]);

  const handleSearch = async (term: string) => {
    if (!term) {
      setResults([]);
      return;
    }

    const payloadObj: Payload = {
      query: term,
      limit: 10,
      excludeContacts: true,
    };

    try {
      const response = await fetch('/api/torre-search-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadObj),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Failed to fetch search results: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setResults(data);
      } else if (data && Array.isArray(data.results)) {
        setResults(data.results);
      } else if (data && typeof data === 'object') {
        const resultsArray = Object.values(data).filter(
          (item): item is TorreSearchResult =>
            item !== null && typeof item === 'object' && 'name' in item
        );
        setResults(resultsArray);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
  };

  return { searchTerm, setSearchTerm, results, handleSearch };
}
