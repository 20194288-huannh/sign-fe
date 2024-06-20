<template>
  <div class="relative">
    <ToolBar
      v-model:totalPage="totalPage"
      v-model:pageNum="pageNum"
      v-model:signModal="signModal"
      v-model:users="users"
      v-model:receiverId="receiverId"
      v-model="scale"
      v-model:signatures="signatures"
      @on-next-page="onNextPage"
      @on-prev-page="onPrevPage"
      @scale-up="scaleUp"
      @scale-down="scaleDown"
      @note="note"
    />
    <div class="flex gap-5 content">
      <div id="pageContainer" class="bg-[#3D424E33] relative flex-grow">
        <div class="pdfContent">
          <DropDragSign
            v-for="(item, idx) in signatures"
            :isShow="item.page === pageNum"
            :key="idx"
            :idx="idx"
            :width="item.position.width"
            :height="item.position.height"
            :top="item.position.top"
            :left="item.position.left"
            :canResize="item.can_resize"
            :text="item.data"
            @resize="(newRect) => resize(newRect, idx)"
            @drag="(newRect) => resize(newRect, idx)"
            @drag-stop="dragStop(idx)"
            @click="selectedSignature = item"
            @close="removeItem"
            :style="item.receiverId ? `background-color: ${background[item.receiverId]}` : ''"
          >
            <el-date-picker
              v-model="item.data"
              format="YYYY-MM-DD"
              v-if="item.type === SIGNATURE_TYPE.DATE && item.page === pageNum"
              @click="
                () => {
                  signModal = 2
                  selectedSignature = item
                }
              "
            />
            <el-input
              v-model="item.data"
              v-if="item.type === SIGNATURE_TYPE.TEXT && item.page === pageNum"
              :resizeTextarea="resizeTextarea"
              style="width: 100%"
              autosize
              type="textarea"
              placeholder="Please input"
            />
            <p
              v-if="
                item.type === SIGNATURE_TYPE.SIGNATURE &&
                (item.position.top !== 0 || item.position.left !== 0)
              "
              @click="
                () => {
                  signModal = 2
                  selectedSignature = item
                }
              "
            >
              {{
                arrSignSecondStepValue.main.find((e) => e.id === signatureValue)?.name ??
                SIGNATURE_TYPE.SIGNATURE
              }}
            </p>
            <!-- <el-checkbox v-if="
              item.type === SIGNATURE_TYPE.CHECKBOX &&
              (item.position.top !== 0 || item.position.left !== 0)"
              @click="() => { signModal = 2; selectedSignature = item; }" class="w-10" />
            <el-radio v-if="
              item.type === SIGNATURE_TYPE.RADIO &&
              (item.position.top !== 0 || item.position.left !== 0)
            " /> -->
            <img
              v-if="item.type === SIGNATURE_TYPE.IMAGE && item.page === pageNum"
              :src="item.data.path"
              :style="`width: ${item.position.width}px; height: ${item.position.height}px`"
            />
            <div
              v-if="item.receiverId && item.receiver"
              :style="`background-color: ${background[item.receiverId as number]}`"
              class="truncate"
            >
              {{ item.receiver.name }}
            </div>
            <div
              v-if="!item.type"
              class="border-dashed border-2 border-indigo-600"
              @click="
                () => {
                  signModal = 2
                  selectedSignature = item
                }
              "
            >
              {{ item.position }}
            </div>
          </DropDragSign>
          <canvas id="the-canvas" ref="canvas" class=""></canvas>
        </div>
      </div>
      <SigntureInfo
        class="mt-5 flex-shrink w-1/4"
        v-model:signature="selectedSignature"
        @resize="resize"
      />
    </div>
    <SignatureModal
      v-model:signModal="signModal"
      @save="save"
      @sign="sign"
      :height="selectedSignature?.position.height || 175"
      :width="selectedSignature?.position.width || 350"
    />
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import pdfjsLib from 'pdfjs-dist/build/pdf'
import 'pdfjs-dist/web/pdf_viewer.css'
import { onMounted, ref, watch } from 'vue'
import DropDragSign from '@/components/DropDragSign.vue'
import { useSendSignStore } from '@/stores/send-sign'
import Logo from '@/assets/img/signature.png'
import ToolBar from '@/components/MainStep/PrepareDocument/ToolBar.vue'
import Draw from '@/components/MySignature/Draw.vue'
import { SignatureService } from '@/services'
import type { Receiver, Signature } from '@/types/send-sign'
import { SIGNATURE_TYPE } from '@/types/send-sign'
import SigntureInfo from '@/components/MainStep/PrepareDocument/SignatureInfo.vue'
import SignatureModal from '@/components/SignatureModal.vue'
import { isNumber } from 'element-plus/es/utils/types.mjs'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js'

const props = defineProps(['pdf', 'canClose'])

const { arrSignSecondStepValue } = useSendSignStore()
const dragger = ref(false)
const value = ref('2021-10-29')
const signatureValue = ref()
const signatures = defineModel('signatures', {
  required: true,
  type: Array<Signature>
})
const canvasPdf = defineModel<any>('canvas', { required: true })
const users = defineModel<Array<Receiver>>('users', { required: true })
const pdfContent = ref()
const totalPage = ref<number>()
const scale = ref<number>(1.2)
const signModal = ref<number>(0)
const selectedSignature = ref<Signature>()
const receiverId = ref<number>(0)

const background: { [key: number]: string } = {
  0: 'rgb(188, 225, 255)',
  1: 'rgb(239, 114, 97)',
  2: 'rgb(213, 156, 156)',
  3: 'rgb(248, 152, 209)',
  4: 'rgb(127, 171, 202)'
}

const pageNum = ref(1)
const pageRendering = ref(false)
const pageNumPending = ref()
const canvas = ref<any>()
const pdfDoc = ref<any>()

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
const renderPage = (num: number) => {
  pageRendering.value = true
  let ctx = canvas.value.getContext('2d')
  // Using promise to fetch the page
  pdfDoc.value.getPage(num).then(function (page: any) {
    var viewport = page.getViewport(scale.value)
    canvas.value.height = viewport.height
    canvas.value.width = viewport.width
    canvasPdf.value.width = viewport.width
    canvasPdf.value.height = viewport.height

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    }
    var renderTask = page.render(renderContext)

    renderTask.promise.then(function () {
      pageRendering.value = false
      if (pageNumPending.value) {
        // New page rendering is pending
        renderPage(pageNumPending.value)
        pageNumPending.value = null
      }
    })
  })

  // Update page counters
  // document.getElementById('page_num').textContent = num
}

const scaleUp = () => {
  scale.value = Number(scale.value) + 0.1
  renderPage(pageNum.value)
}

const scaleDown = () => {
  scale.value = Number(scale.value) - 0.1
  renderPage(pageNum.value)
}

const save = async (signaturePad: any) => {
  const { isEmpty, data } = signaturePad.saveSignature()
  if (!isEmpty) {
    var form = new FormData()
    form.append('signature', dataURLtoFile(data, 'signature.png'))
    const response = await SignatureService.create(form)
    const drawSign = response.data.data
    if (signModal.value === 2) {
      signatures.value.map((item: Signature) => {
        if (selectedSignature.value && item.id === selectedSignature.value.id) {
          item.type = SIGNATURE_TYPE.IMAGE
          item.scale = Number(scale.value)
          item.data = {
            id: drawSign.file.id,
            path: drawSign.file.path,
            name: drawSign.file.name
          }
          return item
        }
        return item
      })
    } else {
      let signature = {
        type: SIGNATURE_TYPE.IMAGE,
        scale: Number(scale.value),
        page: pageNum.value,
        can_resize: true,
        position: {
          width: 100,
          height: 60,
          top: 0,
          left: 0
        },
        data: {
          id: drawSign.file.id,
          path: drawSign.file.path,
          name: drawSign.file.name
        }
      }
      signatures.value.push(signature as never)
    }
    signaturePad.clearSignature()
    signModal.value = 0
  }
}

const sign = (selected: number) => {
  console.log(selected)
}

const note = async () => {
  let signature: Signature = {
    type: SIGNATURE_TYPE.REQUIRED,
    scale: scale.value,
    page: pageNum.value,
    can_resize: true,
    position: {
      width: 200,
      height: 60,
      top: 50,
      left: 50
    },
    receiver: users.value[receiverId.value],
    receiverId: Number(receiverId.value)
  }
  signatures.value.push(signature)
}

const dataURLtoFile = (dataurl: string, filename: string) => {
  var arr = dataurl.split(','),
    mime = (arr[0].match(/:(.*?);/) as never)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

/**
 * Displays previous page.
 */
function onPrevPage() {
  if (pageNum.value <= 1) {
    return
  }
  pageNum.value--
  renderPage(pageNum.value)
}

/**
 * Displays next page.
 */
function onNextPage() {
  if (pageNum.value >= pdfDoc.value.numPages) {
    return
  }
  pageNum.value++
  renderPage(pageNum.value)
}

const removeItem = (idx: number) => {
  // console.log(signatures.value)
  // signatures.value = signatures.value.filter((item, index) => index !== idx)
  // console.log(signatures.value)
}
/**
 * Asynchronously downloads PDF.
 */

const dragStop = (idx: number) => {
  dragger.value = false
}

const handleDrag = (e: any, item: any) => {
  console.log('drag')
  console.log(signatures.value)
}

const onDrop = (e: any, item: any) => {
  console.log('on drop')
  console.log(signatures.value)
}

const resize = (
  newRect: { width: number; height: number; top: number; left: number },
  idx: number
) => {
  dragger.value = true
  signatures.value[idx].position = {
    ...newRect
  }

  // _arrResize[idx].arrSize[idx1] = {
  //   width: newRect.width,
  //   height: newRect.height,
  //   top: newRect.top,
  //   left: newRect.left
  // }
  // arrType.value = _arrResize

  // if (
  //   (newRect.top !== 0 || newRect.left !== 0) &&
  //   !arrType.value[idx].arrSize.find((e) => e.top == 0 && e.left == 0)
  // ) {
  //   arrType.value[idx].arrSize.push({
  //     width: 100,
  //     height: 40,
  //     top: 0,
  //     left: 0
  //   })
  // }
}

const resizeTextarea = () => {}

const getPdf = async () => {
  // pdfjsLib.getDocument(`http://localhost:8868/api/files/2`).promise.then(function (pdfDoc_: any) {
  if (props.pdf) {
    pdfDoc.value = props.pdf
    totalPage.value = pdfDoc.value.numPages

    // Initial/first page rendering
    renderPage(pageNum.value)
  }
}

onMounted(() => {
  getPdf()
})

watch(
  () => props.pdf,
  () => {
    getPdf()
  }
)
</script>

<style scope>
#pageContainer {
  margin: auto;
  height: 850px;
  overflow: scroll;
}

/* .border {
  border: 1px solid red;
} */

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

.custom-select > .el-select__wrapper {
  height: 40px;
}

.vs-components {
  border-right: 1px solid #ececec;
  position: relative;
  overflow-y: scroll;
  overflow-x: scroll;
  padding: 0 10px;
  display: flex;
  background: #f8f8f8;
}

.vs-components::-webkit-scrollbar {
  display: none;
}

.vs-components .components-icon {
  text-align: center;
  width: 25px;
  height: 25px;
  margin-bottom: 6px;
  font-size: 30px;
}

.components-item {
  height: 65px;
  width: 50%;
  float: left;
  display: flex;
  border-bottom: 1px solid #ececec;
  align-items: center;
  justify-content: center;
  cursor: move;
  flex-direction: column;
  font-weight: 300;
}

.components-item:nth-child(2n + 1) {
  border-right: 1px solid #ececec;
}

.components-item:hover {
  background: #f5f5f5;
}

.pdfContent {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
