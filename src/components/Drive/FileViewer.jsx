"use client";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import React from "react";

export default function FileViewer({ file, file_name, file_ext }) {
  return (
    <>
      <DocViewer
        documents={[
          {
            uri: file,
            fileName: file_name,
            fileType: file_ext,
            // fileData: "sqwdw",
          },
        ]}
        config={{
          pdfZoom: {
            defaultZoom: 0.6, // 1 as default,
            zoomJump: 0.2, // 0.1 as default,
          },
        }}
        // prefetchMethod="GET"
        pluginRenderers={DocViewerRenderers}
      />
    </>
  );
}
