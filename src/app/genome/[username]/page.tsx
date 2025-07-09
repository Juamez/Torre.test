'use client';

import useFetch from '@/hooks/useFetch';
import { use } from 'react';
import ProfileCard from '@/components/ProfileCard';

interface GenomePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default function GenomePage({ params }: GenomePageProps) {
  const { username } = use(params);
  const { profile, error } = useFetch(`/api/torre-proxy/${username}`);

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div className="text-slate-50">Loading...</div>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold text-amber-50">
          Personal Card of{' '}
          {username.charAt(0).toUpperCase() + username.slice(1)} (Torre)
        </h1>
        <section>
          <ProfileCard profile={profile} />
        </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
