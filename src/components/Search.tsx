'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/hooks/useSearch';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Search() {
  const { setSearchTerm, results, handleSearch, searchTerm } = useSearch();
  const router = useRouter();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, handleSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const resultArray = Array.isArray(results) ? results : [];

  const handleClickGenome = (username: string) => {
    router.push(`/genome/${encodeURIComponent(username)}`);
  };

  return (
    <section className="flex flex-col items-center justify-center w-full min-h-full p-4">
      <input
        type="text"
        placeholder="Search..."
        className={`border border-gray-600 dark:border-gray-300 rounded-lg p-2 w-full max-w-md text-slate-900 dark:text-slate-200`}
        onChange={handleSearchChange}
      />
      <ul>
        {resultArray.length ? (
          resultArray.map((item, index) => (
            <li
              key={item.ardaId || index}
              className="p-2 border-b border-bg-amber-300 text-slate-950 dark:border-gray-200 dark:text-amber-50"
            >
              <div className="flex justify-center items-center gap-4">
                <button
                  className="w-full text-left flex items-center gap-4 p-2 rounded hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
                  onClick={() =>
                    handleClickGenome(item.username || item.name || '')
                  }
                >
                  <Image
                    src={item.imageUrl || '/default-avatar.svg'}
                    alt={item.name || 'Unknown'}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col w-full">
                    <h3 className="font-semibold">{item.name || 'Unknown'}</h3>
                    <p className="text-sm text-slate-900 dark:text-gray-200">
                      @{item.username || 'No username'}
                    </p>
                    <div>
                      <span className="text-xs text-slate-900 dark:text-gray-400">
                        PageRank:{' '}
                        {item.pageRank !== undefined
                          ? parseFloat(String(item.pageRank)).toFixed(0)
                          : 'N/A'}
                      </span>
                      {item.verified && (
                        <span className="ml-2 text-xs text-blue-500">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="p-2 text-slate-900 dark:text-gray-50">
            No results found
          </li>
        )}
      </ul>
    </section>
  );
}
