// ResponseHandlerComponent.tsx
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface Props {
  prompt: string | null;
  material: File | null;
  answer: string;
  loading: boolean;
  error: string;
}

function ResponseHandlerComponent({ prompt, material, answer, loading, error }: Props) {
  return (
    <div className="flex flex-col gap-4 w-full">

      {/* User message bubble */}
      <div className="self-end border rounded-md p-3 max-w-md bg-gray-100">
        <p className="font-semibold text-sm">{prompt}</p>
        {material && (
          <p className="text-xs text-gray-500 mt-1">
            📄 {material.name} ({(material.size / 1024).toFixed(1)} KB)
          </p>
        )}
      </div>

      {/* AI response bubble */}
      <div className="self-start w-full max-w-2xl border rounded-md p-4 bg-white">

        {/* Loading state */}
        {loading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
            <span className="inline-block w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
            <span className="inline-block w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
            <span className="ml-1">Analysing your document...</span>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-red-500 text-sm">
            <p className="font-semibold">Something went wrong</p>
            <p className="mt-1 text-red-400">{error}</p>
          </div>
        )}

        {/* Success state — markdown + latex */}
        {!loading && !error && answer && (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {answer}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResponseHandlerComponent;
