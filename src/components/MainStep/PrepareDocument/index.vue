<template>
  <VueDragResize :isActive="true" :w="200" :h="200" v-on:resizing="resize" v-on:dragging="resize">
    <h3>Hello World!</h3>
    <p>{{ position.top }} х {{ position.left }}</p>
    <p>{{ position.width }} х {{ position.height }}</p>
  </VueDragResize>
  <div id="pageContainer">
    <div id="viewer" class="pdfViewer"></div>
  </div>
</template>

<script lang="ts" setup>
import  pdfjsLib from "pdfjs-dist/build/pdf";
import { PDFViewer } from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";
import { onMounted, ref } from 'vue'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js";

onMounted(() => {
  getPdf()
})

const position = ref({
  width: 0,
  height: 0,
  top: 0,
  left: 0
})

const resize = (newRect) => {
  position.width = newRect.width;
  position.height = newRect.height;
  position.top = newRect.top;
  position.left = newRect.left;
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
