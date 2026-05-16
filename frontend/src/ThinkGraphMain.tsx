// ThinkGraphMain.tsx
import axios from "axios";
import type React from "react";
import { useState } from "react";
import ResponseHandlerComponent from "./ResponseHandlerComponent";

interface RelatedLink {
  title: string;
  url: string;
  snippet: string;
}

function ThinkGraphMain() {
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadFlag, setUploadFlag] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [relatedLinks, setRelatedLinks] = useState<RelatedLink[]>([]);

  const handlePromptBox = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.currentTarget.value);
    event.currentTarget.style.height = "auto";
    event.currentTarget.style.height = `${event.currentTarget.scrollHeight / 2}px`;
  };

  const postPrompt = async () => {
    if (!prompt.trim()) return;
    try {
      setLoading(true);
      setError("");
      setRelatedLinks([]);
      setUploadFlag(true);

      const formdata = new FormData();
      formdata.append("prompt", prompt);
      if (selectedFile) formdata.append("material", selectedFile);

      const response = await axios.post(
        "http://localhost:8000/api/query/",
        formdata
      );

      setAnswer(response.data.answer);
      setRelatedLinks(response.data.related_links ?? []);
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await postPrompt();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files) return;
    const file = files.item(0);
    if (!file) return;
    setSelectedFile(file);
  };

  const handleReset = () => {
    setPrompt("");
    setSelectedFile(null);
    setUploadFlag(false);
    setAnswer("");
    setError("");
    setLoading(false);
    setRelatedLinks([]);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] font-serif">
      {/* Header */}
      <header className="border-b border-stone-300 bg-white/70 backdrop-blur-sm px-8 py-5 flex items-baseline gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">
          ThinkGraph
        </h1>
        <span className="text-xs text-stone-400 font-sans tracking-widest uppercase">
          Academic RAG · v0.0.1
        </span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Input panel */}
        {!uploadFlag && (
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-6 flex flex-col gap-4">
            <p className="text-sm text-stone-500 font-sans">
              Upload an academic PDF and ask a question about it.
            </p>

            {/* File picker */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="flex items-center gap-2 border border-dashed border-stone-300 rounded-lg px-4 py-2 text-sm text-stone-500 hover:border-stone-500 hover:text-stone-700 transition-colors font-sans">
                <span className="text-lg">📄</span>
                {selectedFile
                  ? `${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)`
                  : "Attach PDF…"}
              </div>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Prompt row */}
            <div className="flex items-end gap-3">
              <textarea
                className="flex-1 resize-none border border-stone-200 rounded-lg p-3 text-sm font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 min-h-[44px] max-h-40"
                placeholder="What would you like to know about this paper?"
                onChange={handlePromptBox}
                onKeyDown={handleEnter}
                value={prompt}
                rows={1}
              />
              <button
                className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-sm font-sans font-medium disabled:opacity-40 hover:bg-stone-700 transition-colors"
                onClick={postPrompt}
                disabled={!prompt.trim()}
              >
                Ask →
              </button>
            </div>
          </div>
        )}

        {/* Response panel */}
        {uploadFlag && (
          <div className="flex flex-col gap-6">
            <ResponseHandlerComponent
              prompt={prompt}
              material={selectedFile}
              answer={answer}
              loading={loading}
              error={error}
              relatedLinks={relatedLinks}
            />
            <button
              className="self-start text-sm font-sans text-stone-500 hover:text-stone-900 underline underline-offset-2 transition-colors"
              onClick={handleReset}
            >
              ← New query
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default ThinkGraphMain;
