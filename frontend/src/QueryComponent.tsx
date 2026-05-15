import axios from "axios";
import { Form } from "lucide-react";
import type React from "react";
import { useState } from "react";

function QueryComponent() {
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null)





  const handlePromptBox = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPrompt(event.currentTarget.value);
    event.currentTarget.style.height = "auto"
    event.currentTarget.style.height = `${event.currentTarget.scrollHeight / 2}px`
  };



  const postPrompt = async () => {
    const backend_data = {
      prompt: prompt,
      date: Date.now(),
    };

    try {
      const formdata = new FormData()
      formdata.append("prompt", prompt)
      if (selectedFile) {
        formdata.append("material", selectedFile)
      }
      const response = await axios.post(
        "http://localhost:8000/api/query/",
        formdata
      );

      console.log(
        "================ POSTING TO DJANGO ================="
      );

      console.log(response.data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleEnter = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      await postPrompt();
    }
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const files = event.currentTarget.files;

    if (!files) {
      return;
    }

    const finalUpload = files.item(0);

    if (!finalUpload) {
      return;
    }

    setSelectedFile(finalUpload);
  };

  return (
    <>
      <h1>Think Graph : Your AI Research Search Engine</h1>
      <h2>v:0.0.1</h2>

      {/* Prompt and file uploading div */}
      <div className="flex items-center gap-3">
        <input type="file" onChange={handleFileUpload} />

        <textarea
          className="flex-1 resize-none h-10 border rounded-md p-2"
          placeholder="Knowledge starts here"
          onChange={handlePromptBox}
          onKeyDown={handleEnter}
          value={prompt}
        />

        <button
          className="px-4 py-2 bg-black text-white rounded-md"
          onClick={postPrompt}
        >
          Enter
        </button>
      </div>
    </>
  );
}

export default QueryComponent;
