import axios from "axios";
import type React from "react";
import { useState } from "react";

function QueryComponent() {
  const [prompt, setPrompt] = useState("");

  const handlePromptBox = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPrompt(event.currentTarget.value);
  };

  const postPrompt = async () => {
    const backend_data = {
      prompt: prompt,
      date: Date.now(),
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/query/",
        backend_data
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

  return (
    <>
      <h1>Think Graph : Your AI Research Search Engine</h1>
      <h2>v:0.0.1</h2>

      <textarea
        placeholder="Knowledge starts here"
        onChange={handlePromptBox}
        onKeyDown={handleEnter}
        value={prompt}
      />

      <button onClick={postPrompt}>
        Enter
      </button>

      <p>You typed: {prompt}</p>
    </>
  );
}

export default QueryComponent;
