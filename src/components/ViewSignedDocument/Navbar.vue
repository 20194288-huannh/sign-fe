<script setup lang="ts">
const emit = defineEmits(['finish'])
</script>

<template>
    <div class="navbar">
        <div class="logo bg-[#00b3b3] w-230">
            Sign
        </div>
        <div class="main-content">
            <div class="filename">pdf-sample</div>
            <div class="navbar-nav">
                <button class="mr-5 nav-button">Audit Log</button>
                <button class="mr-5 nav-button flex" @click="emit('finish')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" class="mr-2" width="20"
                        height="20">
                        <path
                            d="M12,2A10,10,0,1,0,22,12a8.1,8.1,0,0,0-.5-3.1l-1.3,1.2a5.8,5.8,0,0,1,.3,1.9A8.5,8.5,0,1,1,12,3.5a8.3,8.3,0,0,1,5.8,2.4l1.1-1.1A9.8,9.8,0,0,0,12,2Zm8.7,3.3L12,14,8.7,10.7,7.6,11.8l3.8,3.8.6.6.6-.6,9.2-9.2Z"
                            fill="currentcolor"></path>
                    </svg>Finish</button>
                <button class="mr-5 nav-button flex">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" class="mr-2 mt-1"
                        width="20" height="20">
                        <path
                            d="M26,16.7H18.3c-.4,0-.6-.3-.6-.7a.6.6,0,0,1,.6-.6H26a.6.6,0,0,1,.6.6A.7.7,0,0,1,26,16.7Z"
                            transform="translate(-4.4 -9.1)" fill="currentcolor"></path>
                        <path
                            d="M24.4,19.3l-.5-.2a.6.6,0,0,1,0-.8L26.1,16l-2.2-2.3a.5.5,0,0,1,0-.8.5.5,0,0,1,.8,0l2.6,2.7a.6.6,0,0,1,0,.9l-2.5,2.6Z"
                            transform="translate(-4.4 -9.1)" fill="currentcolor"></path>
                        <path
                            d="M11.3,16.6a3.8,3.8,0,0,1,0-7.5,3.8,3.8,0,1,1,0,7.5Zm0-6.3a2.6,2.6,0,0,0,0,5.1,2.6,2.6,0,1,0,0-5.1Z"
                            transform="translate(-4.4 -9.1)" fill="currentcolor"></path>
                        <path
                            d="M17.5,22.8a.6.6,0,0,1-.6-.6,5.6,5.6,0,0,0-5.6-5.6,5.7,5.7,0,0,0-5.7,5.6.5.5,0,0,1-.6.6.6.6,0,0,1-.6-.6,6.9,6.9,0,0,1,6.9-6.8,6.8,6.8,0,0,1,6.8,6.8A.5.5,0,0,1,17.5,22.8Z"
                            transform="translate(-4.4 -9.1)" fill="currentcolor"></path>
                    </svg>Change Request</button>
                <button class="mr-5 nav-button">Download</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.navbar {
    width: 100%;
    display: flex;
    position: fixed;
    top: 0;
    height: 52px;
    background-color: #f8f9fa;
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
}

.logo::after {
    content: "";
    background-color: #00b3b3;
    height: 38px;
    width: 48px;
    position: absolute;
    right: -20px;
    top: 3px;
    transform: rotate(43deg);
}

.logo {
    position: relative;
    background-color: #00b3b3;
    width: 200px;
}

.main-content {
    margin-left: 48px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.filename {
    font-weight: bold;
}

.navbar-nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.nav-button {
    border: 1px solid #00b3b3;
    border-radius: 3px;
    padding: 4px 8px;
    color: #00b3b3;
}
</style>
