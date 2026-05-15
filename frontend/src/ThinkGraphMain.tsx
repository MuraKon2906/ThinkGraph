// ThinkGraphMain.tsx
import axios from "axios";
import type React from "react";
import { useState } from "react";
import ResponseHandlerComponent from "./ResponseHandlerComponent";

function ThinkGraphMain() {
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadFlag, setUploadFlag] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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
      setUploadFlag(true); // show response panel immediately with loading state

      const formdata = new FormData();
      formdata.append("prompt", prompt);
      if (selectedFile) formdata.append("material", selectedFile);

      const response = await axios.post(
        "http://localhost:8000/api/query/",
        formdata
      );
      setAnswer(response.data.answer);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
  };

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Think Graph</h1>
      <p className="text-sm text-gray-500 mb-6">Your AI Research Search Engine — v0.0.1</p>

      {/* Input panel — hidden once submitted */}
      {!uploadFlag && (
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="text-sm"
          />
          <textarea
            className="flex-1 resize-none h-10 border rounded-md p-2 text-sm"
            placeholder="Knowledge starts here..."
            onChange={handlePromptBox}
            onKeyDown={handleEnter}
            value={prompt}
          />
          <button
            className="px-4 py-2 bg-black text-white rounded-md text-sm disabled:opacity-50"
            onClick={postPrompt}
            disabled={!prompt.trim()}
          >
            Enter
          </button>
        </div>
      )}

      {/* Response panel */}
      {uploadFlag && (
        <>
          <ResponseHandlerComponent
            prompt={prompt}
            material={selectedFile}
            answer={answer}
            loading={loading}
            error={error}
          />
          <button
            className="mt-4 px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
            onClick={handleReset}
          >
            ← New query
          </button>
        </>
      )}
    </div>
  );
}

export default ThinkGraphMain;
