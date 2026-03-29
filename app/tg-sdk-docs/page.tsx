import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { validRegistry } from './_data/registry';

export default function TgDocsPage() {
  const components = validRegistry.filter((e) => e.category === 'Component');
  const hooks = validRegistry.filter((e) => e.category === 'Hook');

  return (
    <div>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold'>TMA SDK 文档</h1>
        <p className='text-muted-foreground'>
          @lbank/tma-sdk 提供的所有组件和 Hooks，封装了 Telegram WebApp JS SDK
          的常用 API。
        </p>
      </div>

      <section className='mb-10'>
        <h2 className='mb-4 text-xl font-semibold'>Components</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {components.map((entry) => (
            <Link
              key={entry.slug}
              href={`/tg-sdk-docs/${entry.slug}`}
              className='block'
            >
              <Card className='h-full transition-shadow hover:shadow-md'>
                <CardHeader>
                  <div className='flex items-start justify-between gap-2'>
                    <CardTitle className='text-base'>{entry.name}</CardTitle>
                    <Badge variant='secondary'>Component</Badge>
                  </div>
                  <CardDescription>{entry.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className='mb-4 text-xl font-semibold'>Hooks</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {hooks.map((entry) => (
            <Link
              key={entry.slug}
              href={`/tg-sdk-docs/${entry.slug}`}
              className='block'
            >
              <Card className='h-full transition-shadow hover:shadow-md'>
                <CardHeader>
                  <div className='flex items-start justify-between gap-2'>
                    <CardTitle className='text-base'>{entry.name}</CardTitle>
                    <Badge variant='outline'>Hook</Badge>
                  </div>
                  <CardDescription>{entry.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
