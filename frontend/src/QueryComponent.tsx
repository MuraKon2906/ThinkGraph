import type React from "react";
import { useState } from "react";

function QueryComponent() {
  const [prompt, setPrompt] = useState("");

  const handlePromptBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrompt(event.currentTarget.value);
  };

  const backend_data = {
    "prompt": prompt,
    "data": Date.now()
  }

  return (
    <>
      <h1>Think Graph : Your AI Research Search Engine</h1>
      <h2>v:0.0.1</h2>

      <input
        type="text"
        placeholder="Knowledge starts here"
        onChange={handlePromptBox}
        value={prompt}
      />

      <p>
        You typed: {prompt}
      </p>
    </>
  );
}

export default QueryComponent;
