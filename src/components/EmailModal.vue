<template>
    <el-dialog v-model="showModal" title="Check owner" width="500">
    <el-form :model="form">
      <el-form-item label="Email">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeModal();resetModal()">Cancel</el-button>
        <el-button type="primary" @click="submit">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref<{email: string}>({
    email: ''
})

const showModal = defineModel('showModal')
const emit = defineEmits(['getUser'])

const submit = () => {
    closeModal()
    emit('getUser', form.value)
    resetModal()
}

const closeModal = () => {
    showModal.value = false
}

const resetModal = () => {
    form.value.email = ''
}
</script>

<style lang="scss" scoped></style>