<template>
  <div id="app">
    <div class="container">
      <div class="container">
        <VueSignaturePad
          id="signature"
          width="100%"
          height="500px"
          ref="signaturePad"
          :options="options"
        />
      </div>
      <div class="buttons">
        <button @click="undo">Undo</button>
        <button @click="save">Save</button>
        <button @click="change">Change Color</button>
        <button @click="resume">Resume Color</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SignatureService } from '@/services'
const options = ref({
  penColor: "#c0f",
})
const signaturePad = ref(null)
const undo = () => {
  signaturePad.value.undoSignature();
}
const save = () => {
  const { isEmpty, data } = signaturePad.value.saveSignature();

  alert("Open DevTools see the save data.");
  console.log(isEmpty);
  console.log(data);
  if (!isEmpty) {
    var form = new FormData();
    form.append(
      'signature',
      dataURLtoFile(data, 'signature.png')
    );
    SignatureService.create(form)
  }

}
const change = () => {
  this.options = {
    penColor: "#00f",
  }
}
const resume = () => {
  this.options = {
    penColor: "#c0f",
  }
}
const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}
</script>

<style>
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.container {
  width: "100%";
  padding: 8px 16px;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}
</style>
