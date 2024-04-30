<template>
  <el-form
    ref="ruleFormRef"
    :model="email"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm ps-5 pe-5"
    :size="formSize"
    status-icon
  >
    <el-form-item label="Subject" required>
      <el-col :span="11">
        <el-input v-model="email.subject" placeholder="Subject" clearable />
      </el-col>
      <el-col class="text-center" :span="2">
        <span class="text-gray-500"><span class="danger">*</span> Expire Date</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-date-picker
            v-model="email.expired_date"
            label="Pick a time"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="Message" required>
      <ckeditor :editor="editor" v-model="email.content" :config="editorConfig"></ckeditor>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

interface RuleForm {
  subject: string
  expired_date: string
  content: string
}

const props = defineModel('email')
const emit = defineEmits(['sign'])

const editor = ref(ClassicEditor)
const editorData = ref('<p>Content of the editor.</p>')
const editorConfig = ref({})
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<RuleForm>>({
  subject: [
    { required: true, message: 'Please input Subject', trigger: 'blur' }
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  expired_date: [
    {
      required: true,
      message: 'Please input Expire date',
      trigger: 'change'
    }
  ],
  content: [
    {
      required: true,
      message: 'Please input Content',
      trigger: 'change'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  emit('sign')
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`
}))
</script>

<style>
.danger {
  color: #f56c6c;
}
</style>
