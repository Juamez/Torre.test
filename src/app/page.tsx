'use client';

import Search from '@/components/Search';
import useFetch from '@/hooks/useFetch';

export default function Home() {
  const { profile, error } = useFetch('/api/torre-proxy/juamez');

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Torre Profile Data</h1>
        <section>
          <p className="dark:text-white">{profile.person.name}</p>
        </section>
        <Search />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
