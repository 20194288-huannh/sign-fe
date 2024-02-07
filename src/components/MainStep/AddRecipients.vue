<template>
  <el-form
    v-for="(recipient, key) in recipients"
    :inline="true"
    :model="formInline"
    class="demo-form-inline ms-3 me-3"
  >
    <el-form-item>
      <el-input
        v-model="recipient.name"
        placeholder="Signer's Name"
        clearable
        style="width: 500px"
        :prefix-icon="User"
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="recipient.email"
        placeholder="Signer's Email"
        clearable
        style="width: 500px"
        :prefix-icon="Message"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="" style="width: 115px">
      <el-select v-model="recipient.type" clearable>
        <el-option label="Signer" value="0" />
        <el-option label="CC" value="1" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button :icon="Close" circle @click="removeElement(key)" v-if="recipients.length > 1" />
      <el-button :icon="Plus" circle @click="addRecipients" v-if="buttonIndex === key" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { User, Message, Plus, Close } from '@element-plus/icons-vue'

const recipients = reactive([
  {
    name: '',
    email: '',
    type: '0'
  }
])
const buttonIndex = ref(0)

const addRecipients = () => {
  recipients.push({
    name: '',
    email: '',
    type: '0'
  })
  buttonIndex.value++
}

const removeElement = (index) => {
  recipients.splice(index, 1)
  buttonIndex.value--
}

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
