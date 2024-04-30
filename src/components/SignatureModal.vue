<template>
    <el-dialog v-model="signModal" title="Add Signature" width="800">
        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="Draw" name="draw">
                <Draw @save="save" />
            </el-tab-pane>
            <el-tab-pane label="Type" name="type">Type</el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script setup lang="ts">
import Draw from './MySignature/Draw.vue';

const signModal = defineModel('signModal')
const activeName = defineModel('activeName')
const emit = defineEmits(['save'])

const save = (signaturePad: any) => {
    emit('save', signaturePad)
}
</script>

<style lang="scss" scoped></style>