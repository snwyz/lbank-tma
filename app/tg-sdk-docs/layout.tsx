import Link from 'next/link';
import Sidebar from './_components/Sidebar';

export default function TgDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-auto max-w-6xl px-4 py-8'>
      <div className='mb-6 flex items-center gap-2 text-sm text-muted-foreground'>
        <Link href='/' className='hover:text-foreground'>
          首页
        </Link>
        <span>/</span>
        <Link href='/tg-sdk-docs' className='hover:text-foreground'>
          TG Docs
        </Link>
      </div>
      <div className='flex gap-8'>
        <Sidebar />
        <main className='min-w-0 flex-1'>{children}</main>
      </div>
    </div>
  );
}
