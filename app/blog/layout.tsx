export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <article className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-blue-600">
          {children}
        </article>
      </div>
    </div>
  );
}
