import { useSearch } from '@/hooks/useSearch';

export default function Search() {
  const { setSearchTerm, results, handleSearch } = useSearch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-lg p-2 w-full max-w-md"
        onChange={handleSearchChange}
      />
      <ul>
        {results.length > 0 ? (
          results.map((result, index) => (
            <li key={index} className="p-2 border-b border-gray-200">
              {result.name || 'No name available'}
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-500">No results found</li>
        )}
      </ul>
    </div>
  );
}
