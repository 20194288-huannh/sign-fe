<template>
  <el-form
    :inline="true"
    :model="arrSignSecondStepValue"
    class="demo-form-inline ms-3 me-3"
    ref="formRef"
  >
    <div v-for="(recipient, idx) in arrSignSecondStepValue.main" :key="recipient.id">
      <el-form-item
        class="w-[30%] min-w-48 2xl:w-[35%]"
        :prop="'main.' + idx + '.name'"
        :rules="[
          {
            required: true,
            message: `Please enter signer's name`,
            trigger: ['blur']
          }
        ]"
      >
        <el-input
          v-model="recipient.name"
          placeholder="Signer's Name"
          clearable
          :prefix-icon="User"
          class="!w-full"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        class="w-[30%] min-w-48 2xl:w-[35%]"
        :prop="'main.' + idx + '.email'"
        :rules="[
          {
            required: true,
            message: 'Please input email address',
            trigger: ['blur']
          },
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change']
          }
        ]"
      >
        <el-input
          v-model="recipient.email"
          placeholder="Signer's Email"
          clearable
          :prefix-icon="Message"
          class="!w-full"
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
        <el-button
          :icon="Close"
          circle
          @click="removeElement(idx)"
          v-if="arrSignSecondStepValue.main.length > 1"
        />
        <el-button :icon="Plus" circle @click="addRecipients" v-if="buttonIndex === idx" />
      </el-form-item>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { User, Message, Plus, Close } from '@element-plus/icons-vue'
import { ElNotification, type FormInstance } from 'element-plus'
import { REGEX_EMAIL } from '@/constants/regex'
import { ENotificationType } from '@/types/notification'
import { useSendSignStore } from '@/stores/send-sign'

const formRef = ref<FormInstance>()
const { arrSignSecondStepValue } = useSendSignStore()
const buttonIndex = ref(0)

const addRecipients = () => {
  if (
    !REGEX_EMAIL.test(arrSignSecondStepValue.main[arrSignSecondStepValue.main.length - 1].email) ||
    !arrSignSecondStepValue.main[arrSignSecondStepValue.main.length - 1].name
  ) {
    ElNotification({
      title: 'Error',
      message: 'Please enter all fields',
      type: ENotificationType.ERROR
    })
    return
  }
  arrSignSecondStepValue.main.push({
    id: Math.random(),
    name: '',
    email: '',
    type: '0'
  })
  buttonIndex.value++
}

const removeElement = (index: number) => {
  arrSignSecondStepValue.main.splice(index, 1)
  buttonIndex.value--
}

watch(
  () => arrSignSecondStepValue,
  () => {
    console.log(123)
  }
)
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
