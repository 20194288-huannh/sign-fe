<template>
    <div class="flex">
        <el-row :gutter="80">
            <el-col :span="8" v-for="signature in signatures" class="mt-10">
                <div
                    class="min-h-[40px] rounded-sm border-neutral-400 bg-white flex items-center justify-center cursor-pointer relative">
                    <div class="signature">
                        <img :src="signature.file.path">
                    </div>
                    <div class="absolute top-[-10px] right-[-8px] bg-gray-200 h-7 w-7" @click="emit('removeSignatures', signature.id)">
                        <el-icon :size="30">
                            <Close />
                        </el-icon>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { SignatureService } from '@/services'
const emit = defineEmits(['save', 'removeSignatures'])
const signatures = defineModel('signatures')
const options = ref({
    penColor: '#c0f'
})
const signaturePad = ref(null)
const undo = () => {
    signaturePad.value.undoSignature()
}
const change = () => {
    this.options = {
        penColor: '#00f'
    }
}
const resume = () => {
    this.options = {
        penColor: '#c0f'
    }
}
</script>

<style>
.signature {
    border: double 3px transparent;
    border-radius: 5px;
    background-image: linear-gradient(white, white),
        radial-gradient(circle at top left, #4bc5e8, #9f6274);
    background-origin: border-box;
    background-clip: content-box, border-box;
}

.container {
    width: '100%';
    padding: 8px 16px;
}

.buttons {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 8px;
}
</style>