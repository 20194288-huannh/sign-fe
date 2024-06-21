<template>
  <div class="card preparedoc inspectortab inspectscroll">
    <div class="card-body p-4" v-if="signature">
      <p class="text-[#247ede] mt-1 text-left text-md font-semi-bold mb-3">Signature</p>
      <table class="table table-bordered">
        <tbody>
          <tr v-for="(value, key) in signature.position">
            <th width="40%" class="font-weight-normal" style="vertical-align: middle">{{ key }}</th>
            <td width="60%" style="padding: 15px">
              <input
                :readonly="!signature.can_resize"
                type="text"
                @blur="onBlur(signature.position)"
                placeholder="Attribute title"
                v-model="signature.position[key]"
                :class="`form-control input-sm ng-untouched ng-pristine ng-valid ${signature.can_resize ? '' : 'is-readonly'}`"
                autocomplete="off"
              />
            </td>
          </tr>
          <tr v-if="signature.data && typeof signature.data == 'string'">
            <th width="40%" class="font-weight-normal" style="vertical-align: middle">Data</th>
            <td width="60%" style="padding: 15px">
              <input
                type="text"
                placeholder="Attribute title"
                v-model="signature.data"
                :class="`form-control input-sm ng-untouched ng-pristine ng-valid ${signature.can_resize ? '' : 'is-readonly'}`"
                autocomplete="off"
              />
            </td>
          </tr>
          <tr>
            <th width="40%" class="font-weight-normal">Required</th>
            <td>
              <label class="switch top-3"
                ><input type="checkbox" name="toggle" autocomplete="off" /><span
                  class="slider round"
                ></span
              ></label>
            </td>
          </tr>
          <!---->
          <tr>
            <el-button @click="onRemoveItem">Delete</el-button>
          </tr>
          <!----><!---->
        </tbody>
      </table>
      <!---->
    </div>
    <!---->
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import type { Signature, Position } from '@/types/send-sign'

const signature = defineModel<Signature>('signature')
const emit = defineEmits(['resize', 'removeItem'])

const onRemoveItem = () => {
  emit('removeItem')
}

// watch(
//     () => signature.position,
//     () => {
//         emit('resize', signature.position, signature.id)
//     }
// )
const onBlur = (position: Position) => {
  console.log(position)
}
</script>

<style lang="css" scoped>
.card {
  box-shadow: 0 5px 8px rgba(192, 198, 213, 0.2) !important;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
  border-radius: 10px !important;
  background-color: #fff;
}

table {
  border-collapse: collapse;
}

.table-bordered,
.table-bordered td,
.table-bordered th {
  border: 1px solid #dee2e6;
}

.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 0.375rem 0.75rem;
  font-size: 12px;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}
.is-readonly {
  background-color: #3d424e33;
}
</style>
