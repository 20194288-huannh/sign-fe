<template>
  <div class="relative">
    <div class="flex items-center justify-center bg-[#f4f4f4] h-[55px]">

      <DropDragSign :width="position1.width" :height="position1.height" :top="position1.top" :left="position1.left" @resize="resize"/>
      <DropDragSign :width="position2.width" :height="position2.height" :top="position2.top" :left="position2.left" @resize="resize"/>
    </div>
    <div id="pageContainer">
      <div id="viewer" class="pdfViewer">
        
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import pdfjsLib from 'pdfjs-dist/build/pdf'
import { PDFViewer } from 'pdfjs-dist/web/pdf_viewer'
import 'pdfjs-dist/web/pdf_viewer.css'
import { onMounted, ref } from 'vue'
import DropDragSign from '@/components/DropDragSign.vue'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js'

onMounted(() => {
  getPdf()
})

const resize = (newRect: { width: number; height: number; top: number; left: number; }) => {
  console.log(newRect)
  position.value.width = newRect.width
  position.value.height = newRect.height
  position.value.top = newRect.top
  position.value.left = newRect.left
}

const position1 = ref({
  width: 0,
  height: 0,
  top: 0,
  left: 0
})
const position2 = ref({
  width: 0,
  height: 0,
  top: 0,
  left: 0
})

const getPdf = async () => {
  let container = document.getElementById('pageContainer')
  let pdfViewer = new PDFViewer({
    container: container
  })
  let loadingTask = pdfjsLib.getDocument('./pdf-sample.pdf')
  let pdf = await loadingTask.promise
  pdfViewer.setDocument(pdf)
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
