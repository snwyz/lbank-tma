'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { validRegistry } from '../_data/registry';
import { cn } from '@/lib/utils';

const components = validRegistry.filter((e) => e.category === 'Component');
const hooks = validRegistry.filter((e) => e.category === 'Hook');

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className='w-56 shrink-0 py-6 pr-4'>
      <div className='mb-4'>
        <p className='mb-1 px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase'>
          Components
        </p>
        <ul className='space-y-0.5'>
          {components.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/tg-sdk-docs/${entry.slug}`}
                className={cn(
                  'block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                  pathname === `/tg-sdk-docs/${entry.slug}` &&
                    'bg-accent font-medium text-accent-foreground',
                )}
              >
                {entry.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className='mb-1 px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase'>
          Hooks
        </p>
        <ul className='space-y-0.5'>
          {hooks.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/tg-sdk-docs/${entry.slug}`}
                className={cn(
                  'block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                  pathname === `/tg-sdk-docs/${entry.slug}` &&
                    'bg-accent font-medium text-accent-foreground',
                )}
              >
                {entry.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
