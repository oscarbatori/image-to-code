import React, { useRef } from "react";
import logoPng from "./logo.png";
import "react-figma-plugin-ds/figma-plugin-ds.css";
import "./App.css";
import { Textarea, Button } from "react-figma-plugin-ds";


function App() {
  let prompt = ""

  const onCreate = () => {
    parent.postMessage(
      { pluginMessage: { type: "prompt", prompt } },
      "*"
    );
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  const updatePrompt = (value: string) => {
    prompt = value;
  }

  const textarea = <Textarea
    className=""
    defaultValue=""
    onChange={(value) => updatePrompt(value)}
    placeholder="Provide extra prompt instructions for the code generation task..."
    rows={2}
  />

  const createButton = <Button className="actionButton" onClick={onCreate}>Create</Button>
  const cancelButton  = <Button className="actionButton" isSecondary={true} onClick={onCancel}>Cancel</Button>

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px', // spacing between buttons
  };

  return (
    <main>
      <header>
        <img src={logoPng} />
        <h2 style={{ fontSize: '14px' }}>Image to Code Translator</h2>
      </header>
      {textarea}
      <div style={buttonContainerStyle}>
        {createButton}
        {cancelButton}
      </div>
      
    </main>
  );
}

export default App;
