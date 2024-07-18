import React, { useEffect } from "react";

const PDFJS = window.pdfjsLib;

async function showPdf(file) {
  try {
    setPdfRendering(true);
    const uri = URL.createObjectURL(file);
    var _PDF_DOC = await PDFJS.getDocument({ url: uri });
    setPdf(_PDF_DOC);
    setPdfRendering(false);
    document.getElementById("file-to-upload").value = "";
  } catch (error) {
    alert(error.message);
  }
}

export async function renderPage(file) {
  setPageRendering(true);
  const imagesList = [];
  await showPdf(file);
  const canvas = document.createElement("canvas");
  canvas.setAttribute("className", "canv");
  let canv = document.querySelector(".canv");

  // for (let i = 1; i <= pdf.numPages; i++) {
  var page = await pdf.getPage(1);
  var viewport = page.getViewport({ scale: 1 });
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  var render_context = {
    canvasContext: canvas.getContext("2d"),
    viewport: viewport,
  };
  console.log("page lenght", pdf.numPages);
  // setWidth(viewport.width);
  // setHeight(viewport.height);
  await page.render(render_context).promise;
  let img = canvas.toDataURL("image/png");
  imagesList.push(img);
  // }
  return imagesList;
}
