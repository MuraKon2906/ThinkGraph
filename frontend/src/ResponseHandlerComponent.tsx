import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";

interface Props {
  prompt: string | null;
  material: File | null;
}

function ResponseHandlerComponent(props: Props) {
  const content = `
# Hello **Bitch**

Inline math: $E = mc^2$

Block math:

$$
\\int_0^1 x^2 dx
$$
`;

  return (
    <div className="flex flex-col items-end p-4 gap-4">
      {/* User Message */}
      <div className="border rounded-md p-3 max-w-md bg-gray-100">
        <h1 className="font-semibold">
          Prompt ::: {props.prompt}
        </h1>

        {props.material && (
          <h1 className="text-sm text-gray-600 mt-2">
            File Name ::: {props.material.name}
          </h1>
        )}
      </div>

      {/* Markdown Response */}
      <div className="prose max-w-2xl border rounded-md p-4">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default ResponseHandlerComponent;
