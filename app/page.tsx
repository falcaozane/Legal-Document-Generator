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
    <div key={m.id} className="whitespace-pre-wrap ">
      {m.role === "user" ? <p className="font-semibold text-normal text-[#1A63F1]">You</p> : <p className="text-[#277763] font-semibold">AI</p>}
      {m.role === "user" ? (
        <p className="px-4 py-3 text-sm bg-blue-50 rounded-lg mt-1 mb-4">{m.content}</p>
      ) : (
        <>
          <div contentEditable='true' className="rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-900/10">
            <p className="text-justify    mt-2 px-5 py-8 font-normal text-sm bg-gray-50 rounded-lg" id={m.id}>{m.content}</p>
          </div>
          <div className="text-xs cursor-pointer my-1  text-gray-500"> <span className="text-red-500">*</span> Tap to edit the content</div>
          <div className="my-6">
            <button contentEditable='false' onClick={() => {
              const element = document.getElementById(m.id);
              if (element) {
                navigator.clipboard.writeText(element.innerText);
              }
            }} className="bg-[#53BDE1]  text-white font-semibold text-sm  py-2 px-4 rounded-lg">
              Copy
            </button>
            <button className="bg-[#19BA92] hover:bg-gray-800 text-white mx-2 font-semibold text-sm py-2 px-4 rounded-lg" onClick={
                () => {
                  const element = document.getElementById(m.id);
                  if (element) {
                    generatePDF(element.innerText);
                  }
                }
              }>
              Download Pdf
            </button>
            <button className="bg-[#19BA92] hover:bg-gray-800 text-white font-semibold text-sm py-2 px-4 rounded-lg " onClick={
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

      <form onSubmit={handleSubmit} className="">
        <div className="">

          <input
            className="fixed h-12 w-full rounded-xl py-3 px-4 text-sm max-w-xl bottom-0 border border-gray-300  mb-8 focus:outline-none focus:ring-4 focus:ring-blue-500/10 "
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            />
        </div>
      </form>
    </div>
  );
}
