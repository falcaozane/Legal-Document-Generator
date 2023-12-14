"use client";

import { useChat } from "ai/react";
import { Document, Paragraph, Packer } from 'docx';
import { saveAs } from 'file-saver';
import { blob } from "stream/consumers";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  function generateDocument(message: any) {
    let doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: message,
            }),
          ],
        },
      ],
    });
  
    saveDocumentToFile(doc, 'first.docx');
  }
  
  function saveDocumentToFile(doc: any, fileName: any) {
    const packer = new Packer();
    const mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    
    Packer.toBuffer(doc).then((buffer: any) => {
      const blob = new Blob([buffer], { type: mimeType });
      saveAs(blob, fileName);
    });
  }


  function generatePDF(message: any) {
    const pdfDefinition = {
      content: [
        {
          text: message,
          fontSize: 12,
          margin: [0, 0, 0, 12], // optional margin
        },
      ],
    };
  
    savePDFToFile(pdfDefinition, 'first.pdf');
  }
  
  function savePDFToFile(pdfDefinition: any, fileName: any) {
    const pdfMake = require('pdfmake/build/pdfmake');
    const pdfFonts = require('pdfmake/build/vfs_fonts');
  
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
    const pdfDocGenerator = pdfMake.createPdf(pdfDefinition);
    pdfDocGenerator.getBuffer((buffer: any) => {
      const blob = new Blob([buffer], { type: 'application/pdf' });
      saveAs(blob, fileName);
    });
  }
  
  

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
            <p className="text-justify p-2" id={m.id}>{m.content}</p>
          </div>
          <div className="my-4">
          <button contentEditable='false' onClick={() => {
            const element = document.getElementById(m.id);
            if (element) {
              navigator.clipboard.writeText(element.innerText);
            }
          }} className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
            Copy
          </button>
          <button className="bg-black  hover:bg-gray-800 text-white mx-2 font-bold py-2 px-4 rounded" onClick={
              () => {
                const element = document.getElementById(m.id);
                if (element) {
                  generatePDF(element.innerText);
                }
              }
            }>
            Download Pdf
          </button>
          <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded" onClick={
              () => {
                const element = document.getElementById(m.id);
                if (element) {
                  generateDocument(element.innerText);
                }
              }
            }>
            Download Docs
          </button>
          </div>
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
