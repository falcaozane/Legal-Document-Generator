"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  

  return (
    <div className="mx-auto w-full max-w-xl py-24 flex flex-col stretch">
      {messages.length > 0
  ? messages.map((m) => (
    <div key={m.id} className="whitespace-pre-wrap">
      {m.role === "user" ? "User: " : "AI: "}
      {m.role === "user" ? (
        <p>{m.content}</p>
      ) : (
        <><br/>
          <div contentEditable='true'>
            <p id={m.id}>{m.content}</p>
          </div>
          <button contentEditable='false' onClick={() => {
            const element = document.getElementById(m.id);
            if (element) {
              navigator.clipboard.writeText(element.innerText);
            }
          }} className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
            Copy
          </button>
        </>
      )}
    </div>
  ))
  : null}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
