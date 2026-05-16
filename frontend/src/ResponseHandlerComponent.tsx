// ResponseHandlerComponent.tsx
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface RelatedLink {
  title: string;
  url: string;
  snippet: string;
}

interface Props {
  prompt: string | null;
  material: File | null;
  answer: string;
  loading: boolean;
  error: string;
  relatedLinks: RelatedLink[];
}

function ResponseHandlerComponent({
  prompt,
  material,
  answer,
  loading,
  error,
  relatedLinks,
}: Props) {
  return (
    <div className="flex flex-col gap-5 w-full font-sans">
      {/* ── User bubble ──────────────────────────────────────────────── */}
      <div className="self-end max-w-sm bg-stone-900 text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-sm">
        <p className="text-sm leading-relaxed">{prompt}</p>
        {material && (
          <p className="text-xs text-stone-400 mt-1.5">
            📄 {material.name} · {(material.size / 1024).toFixed(1)} KB
          </p>
        )}
      </div>

      {/* ── AI response card ─────────────────────────────────────────── */}
      <div className="self-start w-full bg-white border border-stone-200 rounded-2xl rounded-tl-sm shadow-sm overflow-hidden">
        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-2.5 px-5 py-4 text-stone-400 text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-stone-400 animate-bounce [animation-delay:0ms]" />
            <span className="inline-block w-2 h-2 rounded-full bg-stone-400 animate-bounce [animation-delay:150ms]" />
            <span className="inline-block w-2 h-2 rounded-full bg-stone-400 animate-bounce [animation-delay:300ms]" />
            <span className="ml-1 italic">Analysing paper…</span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="px-5 py-4 text-sm text-red-600">
            <p className="font-semibold">Something went wrong</p>
            <p className="mt-1 text-red-400">{error}</p>
          </div>
        )}

        {/* Answer */}
        {!loading && !error && answer && (
          <div className="px-5 py-4 prose prose-sm prose-stone max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {answer}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* ── Related links ─────────────────────────────────────────────── */}
      {!loading && relatedLinks.length > 0 && (
        <div className="w-full">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-2">
            Related Research
          </p>
          <div className="flex flex-col gap-2">
            {relatedLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-0.5 bg-white border border-stone-200 rounded-xl px-4 py-3 hover:border-stone-400 hover:shadow-sm transition-all"
              >
                <span className="text-sm font-medium text-stone-800 group-hover:text-stone-900 line-clamp-1">
                  {link.title || link.url}
                </span>
                {link.snippet && (
                  <span className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {link.snippet}
                  </span>
                )}
                <span className="text-[10px] text-stone-300 mt-0.5 truncate">
                  {link.url}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResponseHandlerComponent;
