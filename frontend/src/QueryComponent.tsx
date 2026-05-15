import type React from "react";
import { useState } from "react";

function QueryComponent() {
  // Prompt which displays in the input box
  const [prompt, setPrompt] = useState("");
  // Prompt sent to the backend
  const [finalPrompt, setFinalPrompt] = useState("")


  const handlePromptBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrompt(event.currentTarget.value);
  };

  const handleFinalPrompts = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      setFinalPrompt(prompt)
    }
  }
  const backend_data = {
    "prompt": finalPrompt,
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
        onKeyDown={handleFinalPrompts}

        value={prompt}
      />

      <p>
        You typed: {finalPrompt}
      </p>
    </>
  );
}

export default QueryComponent;
