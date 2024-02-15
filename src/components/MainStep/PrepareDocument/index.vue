<template>
    <p id="drag1" draggable @dragstart="drag(event)" class="border">This is a draggable paragraph.</p>
    <div id="pageContainer" @drop="drop(event)">
        <div id="viewer" class="pdfViewer"></div>
    </div>
</template>
  
<script lang="ts" setup>
import  pdfjsLib from "pdfjs-dist/build/pdf";
import { PDFViewer } from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";
import { onMounted } from 'vue'

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js";

onMounted(() => {
    getPdf();
});

const allowDrop = (ev) => {
  ev.preventDefault();
}

const drag = (ev) => {
  ev.dataTransfer.setData("Text", ev.target.id);
}

const drop = (ev) => {
  let data = ev.dataTransfer.getData("Text");
  ev.target.appendChild(document.getElementById(data));
  ev.preventDefault();
}

const getPdf = async () => {
    let container = document.getElementById("pageContainer");
    let pdfViewer = new PDFViewer({
        container: container
    });
    let loadingTask = pdfjsLib.getDocument("./pdf-sample.pdf");
    let pdf = await loadingTask.promise;
    pdfViewer.setDocument(pdf);
}

</script>
  
<style>
#pageContainer {
    margin: auto;
    width: 60%;
    height: 700px;
    overflow: scroll;
}

.border {
    border: 1px solid red;
}

#viewer {
    display: flex;
    flex-direction: column;
    background-color: #eff1f3;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

div.page {
    display: inline-block;
}
</style>