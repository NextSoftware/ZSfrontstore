import React, { useState } from "react";
// import file  = `./sample.pdf`;
export default function PdfViewer() {
  return (
    <div style={{ width: "fit-content", height: "fit-content" }}>
      {/* <embed src="./sample.pdf" width="800px" height="2100px" /> */}
      <iframe
        src=""
        style={{
          border: "0",
          width:"800px",
          height: "2100px",
          margin: "0",
          padding: "0",
        }}
        frameBorder="0"
        name="iframe1"
        id="iframe1"
      ></iframe>
    </div>
  );
}
