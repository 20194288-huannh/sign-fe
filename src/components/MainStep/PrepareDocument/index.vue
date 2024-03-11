<template>
  <div class="relative">
    <div class="flex items-center bg-[#f4f4f4] h-[55px]">
      <div class="relative h-[55px] min-w-28 mt-4 ml-2" v-for="it in arrType" :key="it.type">
        <DropDragSign
          v-for="(item, idx) in arrResize"
          :key="item.id"
          :width="item.width"
          :height="item.height"
          :top="item.top"
          :left="item.left"
          @resize="(newRect) => resize(newRect, idx, it.type)"
          :text="it.text"
          @drag-stop="dragStop(it.type)"
        />
      </div>
      <!-- <DropDragSign :width="position2.width" :height="position2.height" :top="position2.top" :left="position2.left" @resize="resize"/> -->
    </div>
    <div id="pageContainer">
      <div id="viewer" class="pdfViewer"></div>
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

const dragger = ref(false)

const arrResize = ref<any>([
  {
    width: 100,
    height: 40,
    top: 0,
    left: 0
  }
])

const arrType = ref<any>([
  {
    type: 'input',
    text: 'hello',
    arrSize: [
      {
        width: 100,
        height: 40,
        top: 0,
        left: 0
      }
    ]
  },
  {
    type: 'radio',
    text: 'signature',
    arrSize: [
      {
        width: 100,
        height: 40,
        top: 0,
        left: 0
      }
    ]
  },
  {
    type: 'date',
    text: 'date',
    arrSize: [
      {
        width: 100,
        height: 40,
        top: 0,
        left: 0
      }
    ]
  }
])

const dragStop = (type: string) => {
  console.log(type)
  dragger.value = false
}

const resize = (
  newRect: { width: number; height: number; top: number; left: number },
  idx: number,
  item: string
) => {
  dragger.value = true
  const _arrResize = [...arrResize.value]
  _arrResize[idx] = {
    width: newRect.width,
    height: newRect.height,
    top: newRect.top,
    left: newRect.left
  }
  arrResize.value[idx] = _arrResize[idx]
  if (
    (newRect.top !== 0 || newRect.left !== 0) &&
    !arrResize.value.find((e) => e.top == 0 && e.left == 0)
  ) {
    arrResize.value.push({
      width: 100,
      height: 40,
      top: 0,
      left: 0
    })
  }
  // if (arrResize.value.filter((e) => e.top == 0 && e.left == 0).length > 1) {
  //   arrResize.value = arrResize.value.reduce((pre, cur) => {
  //     console.log(12332131232)
  //     if (!pre) {
  //       return [...(pre || []), cur]
  //     }

  //     if (pre.find((e) => e.top == cur.top || e.left == cur.left)) {
  //       console.log(123321)
  //       return [
  //         ...pre,
  //         {
  //           width: 100,
  //           height: 40,
  //           top: 0,
  //           left: 0
  //         }
  //       ]
  //     }

  //     if (cur.top !== 0 || cur.left !== 0) {
  //       return [...pre, cur]
  //     }
  //   }, [])
  // }
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
