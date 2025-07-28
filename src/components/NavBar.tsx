import Link from 'next/link';
import { ToggleTheme } from './ToggleTheme';

export function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 shadow-md">
      <article className="text-xl font-bold text-slate-950 dark:text-slate-50">
        Torre Profile Viewer
      </article>
      <article className="flex justify-evenly items-center xl:w-1/6 space-x-4">
        <Link
          href="/"
          className="text-slate-950 dark:text-slate-50 hover:underline"
        >
          Home
        </Link>
        <ToggleTheme />
      </article>
    </nav>
  );
}
