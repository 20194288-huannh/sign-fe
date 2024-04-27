<template>
    <div class="main">
        <div class="flex border-b-2 pb-3">
            <span class="text-lg font-semibold">My Signature</span>
        </div>
        <el-card class="box-card mt-3 pl-5 pr-5">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="Draw" name="draw">
                    <Draw @save="createSignatures" />
                </el-tab-pane>
                <el-tab-pane label="Type" name="type">Type</el-tab-pane>
            </el-tabs>
        </el-card>
        <el-card class="box-card mt-3 pl-5 pr-5">
            <span class="text-lg font-semibold">My Signature</span>
            <SignatureList v-model:signatures="signatures" @remove-signatures="removeSignature" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Draw from '@/components/MySignature/Draw.vue'
import SignatureList from '@/components/MySignature/SignatureList.vue'
import type { TabsPaneContext } from 'element-plus'
import { SignatureService } from '@/services'

const activeName = ref('draw')
const signatures = ref([])

const fetchSignatures = async () => {
    const response = await SignatureService.listByUser()
    signatures.value = response.data.data
}

const removeSignature = async (id) => {
    const response = await SignatureService.delete(id)
    if (response) {
        fetchSignatures()
    }
}

const createSignatures = async (signaturePad: any) => {
    const { isEmpty, data } = signaturePad.saveSignature()
    if (!isEmpty) {
        var form = new FormData()
        form.append('signature', dataURLtoFile(data, 'signature.png'))
        const response = await SignatureService.create(form)
        if (response) {
            fetchSignatures()
        }
    }
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

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

onMounted(() => {
    fetchSignatures()
})
</script>

<style scoped>
.main {
    padding: 25px 40px;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>