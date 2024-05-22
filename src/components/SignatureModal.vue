<template>
    <el-dialog v-model="signModal" title="Add Signature" width="800">
        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="Draw" name="draw">
                <Draw @save="save" :height="height" :width="width"/>
            </el-tab-pane>
            <el-tab-pane label="Type" name="type">
                <Type @sign="sign" />
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script setup lang="ts">
import Draw from './MySignature/Draw.vue';
import Type from './MySignature/Type.vue';
import { ref } from 'vue'

const signModal = defineModel('signModal')
const activeName = ref<String>('draw')
const emit = defineEmits(['save'])
defineProps({
    height: {
        type: Number,
        default: 100
    },
    width: {
        type: Number,
        default: 100 
    }
})

const save = (signaturePad: any) => {
    emit('save', signaturePad)
}
</script>

<style lang="scss" scoped></style>