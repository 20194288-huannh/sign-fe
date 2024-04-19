<script setup lang="ts">
import SignUp from '../components/SignUp.vue'
</script>

<template>
  <main class="flex justify-center items-center h-screen">
    <div class="w-full">
      <div class="flex justify-center">
        <img
          width="200"
          class="img-fluid"
          style="height: 75px"
          src="https://cdns.sign.co/site/v1.0.1/sign/src/assets/images/sign-logo.png"
          alt="Sign Logo"
        />
      </div>
      <div class="flex justify-center mt-2 pt-2 mb-4">
        <img
          src="https://app.sign.co/app/ng/src/assets/images/sign/sign-complete.svg"
          width="350"
          style="height: 132px"
          alt="Sign Complete"
        />
      </div>
      <h3 class="text-center mt-4 mb-3 text-3xl">
        Hurray, the document has been successfully completed!
      </h3>
      <div class="flex justify-center border-b mb-3">
        <p class="text-lg">A copy of the signed document will reach your inbox.</p>
      </div>
      <div class="flex justify-center">
        <div class="w-1/4">
          <hr class="border-t my-4" />
        </div>
      </div>
      <div>
        <h3 class="text-center pt-3 mb-3 text-3xl">Go Digital! Sign Securely</h3>
        <div class="flex justify-center">
          <p class="text-lg">Get your document signed anywhere, anytime without any hassle</p>
        </div>
        <div class="flex justify-center mt-4">
          <button type="button" class="bg-blue-500 text-white px-4 py-2 rounded-md">
            Try for Free
          </button>
        </div>
      </div>
      <!---->
    </div>
  </main>
</template>
