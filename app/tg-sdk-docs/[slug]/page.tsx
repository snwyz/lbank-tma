import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import CodeBlock from '../_components/CodeBlock';
import TgEnvBanner from '../_components/TgEnvBanner';
import { getEntry, getSlugs } from '../_data/registry';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  return { title: entry ? `${entry.name} — TG SDK Docs` : 'Not Found' };
}

const exampleMap: Record<string, React.ComponentType> = {
  'back-button': dynamic(() => import('../_examples/BackButtonExample')),
  'main-button': dynamic(() => import('../_examples/MainButtonExample')),
  'secondary-button': dynamic(
    () => import('../_examples/SecondaryButtonExample'),
  ),
  'web-app-provider': dynamic(
    () => import('../_examples/WebAppProviderExample'),
  ),
  'use-haptic-feedback': dynamic(
    () => import('../_examples/UseHapticFeedbackExample'),
  ),
  'use-show-alert': dynamic(() => import('../_examples/UseShowAlertExample')),
  'use-theme-params': dynamic(
    () => import('../_examples/UseThemeParamsExample'),
  ),
  'use-viewport': dynamic(() => import('../_examples/UseViewportExample')),
  'use-init-data': dynamic(() => import('../_examples/UseInitDataExample')),
  'use-switch-inline-query': dynamic(
    () => import('../_examples/UseSwitchInlineQueryExample'),
  ),
};

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  const ExampleComponent = entry.hasExample ? exampleMap[entry.slug] : null;

  return (
    <article>
      <div className='mb-6 flex items-center gap-3'>
        <h1 className='text-2xl font-bold'>{entry.name}</h1>
        <Badge
          variant={entry.category === 'Component' ? 'secondary' : 'outline'}
        >
          {entry.category}
        </Badge>
      </div>

      <p className='mb-6 text-muted-foreground'>{entry.description}</p>

      {entry.apiSummary && (
        <section className='mb-6'>
          <h2 className='mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
            API
          </h2>
          <p className='rounded-md bg-muted px-3 py-2 font-mono text-sm'>
            {entry.apiSummary}
          </p>
        </section>
      )}

      <section className='mb-6'>
        <h2 className='mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
          用法示例
        </h2>
        <CodeBlock code={entry.usage} language='tsx' />
      </section>

      {ExampleComponent && (
        <section>
          <h2 className='mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
            交互演示
          </h2>
          <TgEnvBanner />
          <div className='mt-3 rounded-lg border p-4'>
            <ExampleComponent />
          </div>
        </section>
      )}
    </article>
  );
}
