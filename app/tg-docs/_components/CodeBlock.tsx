interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  return (
    <div className='overflow-hidden rounded-lg border bg-muted'>
      <div className='flex items-center gap-2 border-b bg-muted/50 px-4 py-2'>
        <span className='text-xs text-muted-foreground'>{language}</span>
      </div>
      <pre className='overflow-x-auto p-4'>
        <code className='text-sm leading-relaxed'>{code.trim()}</code>
      </pre>
    </div>
  );
}
