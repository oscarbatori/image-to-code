import React, { useRef } from "react";
import logoPng from "./logo.png";
import "./App.css";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const onCreate = () => {
    const prompt = inputRef.current?.value || undefined;
    parent.postMessage(
      { pluginMessage: { type: "prompt", prompt } },
      "*"
    );
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  return (
    <main>
      <header>
        <img src={logoPng} />
        <h2>Image to Code Translator</h2>
      </header>
      <section>
        <input id="input" type="text" min="0" ref={inputRef} />
        <label htmlFor="input">Extra prompt instructions</label>
      </section>
      <footer>
        <button className="brand" onClick={onCreate}>
          Create
        </button>
        <button onClick={onCancel}>Cancel</button>
      </footer>
    </main>
  );
}

export default App;
