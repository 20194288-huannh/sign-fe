<template>
  <div class="toolbar flex items-center">
    <div class="PSPDFKit-Toolbar-DropdownGroup-Sidebar PSPDFKit-7t6uf3numwbvg2qg3x9sx7rkjx flex h-[44px] tool-icon">
      <div class="text">
        <span id="downshift-0-label" for="downshift-0-toggle-button">Sidebar tools, toggle menu</span>
      </div>
      <div class="flex">
        <button
          class="dropdown button-icon PSPDFKit-Toolbar-Button-Sidebar PSPDFKit-Toolbar-Button-Sidebar-Thumbnails border-left"
          title="Thumbnails" aria-label="Thumbnails" aria-pressed="false" type="button">
          <span class="tool-button-icon PSPDFKit-Icon-SidebarThumbnails" aria-hidden="true"><svg
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
              focusable="false">
              <path fill-rule="evenodd"
                d="M10 4.25H5c-.41 0-.75.34-.75.75v5c0 .41.34.75.75.75h5c.41 0 .75-.34.75-.75V5c0-.41-.34-.75-.75-.75Zm-.75 5h-3.5v-3.5h3.5v3.5Zm.75 4H5c-.41 0-.75.34-.75.75v5c0 .41.34.75.75.75h5c.41 0 .75-.34.75-.75v-5c0-.41-.34-.75-.75-.75Zm-.75 5h-3.5v-3.5h3.5v3.5Zm9.75-5h-5c-.41 0-.75.34-.75.75v5c0 .41.34.75.75.75h5c.41 0 .75-.34.75-.75v-5c0-.41-.34-.75-.75-.75Zm-.75 5h-3.5v-3.5h3.5v3.5Zm.75-14h-5c-.41 0-.75.34-.75.75v5c0 .41.34.75.75.75h5c.41 0 .75-.34.75-.75V5c0-.41-.34-.75-.75-.75Zm-.75 5h-3.5v-3.5h3.5v3.5Z"
                clip-rule="evenodd"></path>
            </svg></span></button><button id="downshift-0-toggle-button" aria-haspopup="true" aria-expanded="false"
          aria-labelledby="downshift-0-label downshift-0-toggle-button" class="pl-[5px] pr-[5px]" type="button"
          style="min-width: 0px">
          <span class="tool-button-icon PSPDFKit-6511p928m8fcbcd7nb8arydjxe PSPDFKit-Icon-CaretDown" aria-hidden="true"
            style="width: 12px; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
              fill="currentColor" viewBox="0 0 12 12" focusable="false">
              <path fill-rule="evenodd"
                d="M9.53 3.97a.75.75 0 0 0-1.06 0L6 6.44 3.53 3.97a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 0 0 0-1.06Z"
                clip-rule="evenodd"></path>
            </svg></span>
          <div class="text"><span>Thumbnails</span></div>
        </button>
      </div>
    </div>
    <div class="PSPDFKit-Page-Indicator page">
      <div class="flex items-center">
        <span>Page </span><span>
          <div class="flex h-[26px] ml-2 mr-2">
            <button class="PSPDFKit-Page-Indicator-Prev input-page PSPDFKit-Page-Indicator-Prev-disabled"
              title="Previous Page" @click="emit('onPrevPage')">
              <span class="flex items-center w-[14px] h-[14px]"><svg xmlns="http://www.w3.org/2000/svg" width="12"
                  height="12" fill="currentColor" viewBox="0 0 12 12" focusable="false">
                  <path fill-rule="evenodd"
                    d="M8.03 9.53a.75.75 0 0 0 0-1.06L5.56 6l2.47-2.47a.75.75 0 0 0-1.06-1.06l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06 0Z"
                    clip-rule="evenodd"></path>
                </svg></span></button><input id="page-number" type="number"
              class="PSPDFKit-Page-Indicator-Input page-number" pattern="[0-9]" readonly :value="pageNum" /><button
              class="PSPDFKit-Page-Indicator-Next next" title="Next Page" @click="emit('onNextPage')">
              <span class="flex items-center w-[14px] h-[14px]"><svg xmlns="http://www.w3.org/2000/svg" width="12"
                  height="12" fill="currentColor" viewBox="0 0 12 12" focusable="false">
                  <path fill-rule="evenodd"
                    d="M3.97 2.47a.75.75 0 0 0 0 1.06L6.44 6 3.97 8.47a.75.75 0 0 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
                    clip-rule="evenodd"></path>
                </svg></span>
            </button>
          </div>
        </span><span> of {{ totalPage }}</span>
      </div>
    </div>
    <button class="dropdown button-icon PSPDFKit-Toolbar-Button-Multiple-Annotations-Selection border-left"
      title="Select Multiple Annotations" aria-label="Select Multiple Annotations" aria-pressed="false" type="button">
      <span class="tool-button-icon PSPDFKit-Icon-MultiAnnotationsSelection" aria-hidden="true"><svg
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
          focusable="false">
          <path
            d="M21 6h-1.5V4.5H18V3h2c.55 0 1 .45 1 1v2ZM3 18h1.5v1.5H6V21H4c-.55 0-1-.45-1-1v-2ZM4.5 6H3V4c0-.55.45-1 1-1h2v1.5H4.5V6ZM21 18h-1.5v1.5H18V21h2c.55 0 1-.45 1-1v-2ZM8 4.5V3h3v1.5H8Zm0 15V21h3v-1.5H8ZM3 8h1.5v3H3V8Zm18 0h-1.5v3H21V8Zm-8-3.5V3h3v1.5h-3Zm0 15V21h3v-1.5h-3ZM3 13h1.5v3H3v-3Zm18 0h-1.5v3H21v-3Z">
          </path>
        </svg></span></button><button class="dropdown button-icon border-left" title="Pan Mode" aria-label="Pan Mode"
      aria-pressed="false" type="button">
      <span class="tool-button-icon PSPDFKit-Icon-Pan" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" fill="currentColor" viewBox="0 0 24 24" focusable="false">
          <path fill-rule="evenodd"
            d="M9.75 3.5a2.25 2.25 0 0 1 4.256-1.02A2.25 2.25 0 0 1 17.25 4.5v.878a2.25 2.25 0 0 1 3 2.122V16a6.75 6.75 0 0 1-6.75 6.75h-1.115a6.75 6.75 0 0 1-4.634-1.843l-5.92-5.59a2.55 2.55 0 0 1 3.43-3.773l1.489 1.303V6a2.25 2.25 0 0 1 3-2.122V3.5Zm1.5 7.5a.75.75 0 0 1-1.5 0V6a.75.75 0 0 0-1.5 0v7.735c0 .942-1.11 1.446-1.82.825l-2.157-1.887a1.05 1.05 0 0 0-1.412 1.553l5.92 5.59a5.25 5.25 0 0 0 3.604 1.434H13.5c2.9 0 5.25-2.35 5.25-5.25V7.5a.75.75 0 0 0-1.5 0V11a.75.75 0 0 1-1.5 0V4.5a.75.75 0 0 0-1.5 0V11a.75.75 0 0 1-1.5 0V3.5a.75.75 0 0 0-1.5 0V11Z"
            clip-rule="evenodd"></path>
        </svg></span></button><button class="dropdown button-icon border-left" title="Zoom Out" aria-label="Zoom Out"
      type="button" @click="emit('scaleDown')">
      <span class="tool-button-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          fill="currentColor" viewBox="0 0 24 24" focusable="false">
          <path fill-rule="evenodd"
            d="M18.5 10c0 2.077-.745 3.98-1.983 5.457l.013.013 5 5a.75.75 0 0 1-1.06 1.06l-5-5-.013-.013A8.5 8.5 0 1 1 18.5 10ZM10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM7 9.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H7Z"
            clip-rule="evenodd"></path>
        </svg></span></button><button class="dropdown button-icon border-left" title="Zoom In" aria-label="Zoom In"
      type="button" @click="emit('scaleUp')">
      <span class="tool-button-icon PSPDFKit-Icon-ZoomIn" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" fill="currentColor" viewBox="0 0 24 24" focusable="false">
          <path fill-rule="evenodd"
            d="M18.5 10c0 2.077-.745 3.98-1.983 5.457l.013.013 5 5a.75.75 0 0 1-1.06 1.06l-5-5-.013-.013A8.5 8.5 0 1 1 18.5 10ZM10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm.75-10a.75.75 0 0 0-1.5 0v2.25H7a.75.75 0 0 0 0 1.5h2.25V13a.75.75 0 0 0 1.5 0v-2.25H13a.75.75 0 0 0 0-1.5h-2.25V7Z"
            clip-rule="evenodd"></path>
        </svg></span></button><button class="dropdown button-icon border-left" title="Fit Page" aria-label="Fit Page"
      type="button">
      <span class="tool-button-icon PSPDFKit-Icon-FitPage" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" fill="currentColor" viewBox="0 0 24 24" focusable="false">
          <path fill-rule="evenodd"
            d="M21 5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h18Zm-4 1h4a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-4V6ZM7 18H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4v12ZM8.5 6.5h7v11h-7v-11Z"
            clip-rule="evenodd"></path>
        </svg></span>
    </button>
    <div style="flex: 1 1 0%"></div>
    <div class="flex h-[44px] items-center">
      <div class="text">
        <span id="downshift-8-label" for="downshift-8-toggle-button">Ink tools, toggle menu</span>
      </div>
      <el-dropdown trigger="click" class="p-2 border-2 border-indigo-600" @command="handleCommand"
        v-if="users && isNumber(receiverId) && props.screen == 'sendSign'">
        <span class="el-dropdown-link flex w-36">
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" viewBox="0 0 24 24" fill="#000" width="16" height="16">
            <path
              d="M12.7,13A3.3,3.3,0,1,1,16,9.6,3.3,3.3,0,0,1,12.7,13Zm0-5.4a2.1,2.1,0,1,0,2.1,2.1A2.1,2.1,0,0,0,12.7,7.6Z"
              transform="translate(-1 -0.7)" fill="currentcolor"></path>
            <path d="M18,18.3a.6.6,0,0,1-.6-.6,4.7,4.7,0,1,0-9.5,0,.6.6,0,0,1-1.2,0,6,6,0,1,1,12,0A.6.6,0,0,1,18,18.3Z"
              transform="translate(-1 -0.7)" fill="currentcolor"></path>
            <path
              d="M12.7,23.9A11.6,11.6,0,1,1,24.3,12.3,11.6,11.6,0,0,1,12.7,23.9Zm0-22A10.4,10.4,0,1,0,23,12.3,10.4,10.4,0,0,0,12.7,1.9Z"
              transform="translate(-1 -0.7)" fill="currentcolor"></path>
          </svg>
          <span class="truncate">{{ users[receiverId].name }}</span><el-icon
            class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="index" v-for="(value, index) in users">{{
              value.name
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="flex items-center" v-if="users && isNumber(receiverId) && props.screen == 'sendSign'">
        <button v-if="users" class="dropdown button-icon border-left" title="Drawing" aria-label="Drawing"
          aria-pressed="false" type="button" @click="emit('note')">
          <span class="tool-button-icon PSPDFKit-Icon-Ink" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="currentColor" viewBox="0 0 24 24" focusable="false">
              <path
                d="M13 4a1 1 0 1 0-2 0v2.25h-1a.75.75 0 0 0-.75.75v2.671c0 1.357-.957 2.577-2.157 3.8A6.393 6.393 0 0 0 5.25 18v3a.75.75 0 0 0 1.5 0v-3c0-1.386.536-2.586 1.413-3.479 1.175-1.196 2.587-2.816 2.587-4.85V7.75h2.5v1.921c0 2.035 1.412 3.654 2.587 4.85A4.893 4.893 0 0 1 17.25 18v3a.75.75 0 0 0 1.5 0v-3a6.39 6.39 0 0 0-1.843-4.53c-1.2-1.222-2.157-2.442-2.157-3.799V7a.75.75 0 0 0-.75-.75h-1V4Z">
              </path>
            </svg></span></button><button id="downshift-8-toggle-button" aria-haspopup="true" aria-expanded="false"
          aria-labelledby="downshift-8-label downshift-8-toggle-button" class="pl-[5px] pr-[5px]" type="button"
          style="min-width: 0px">
          <span v-if="users" class="tool-button-icon PSPDFKit-6511p928m8fcbcd7nb8arydjxe PSPDFKit-Icon-CaretDown"
            aria-hidden="true" style="width: 12px; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="12"
              height="12" fill="currentColor" viewBox="0 0 12 12" focusable="false">
              <path fill-rule="evenodd"
                d="M9.53 3.97a.75.75 0 0 0-1.06 0L6 6.44 3.53 3.97a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 0 0 0-1.06Z"
                clip-rule="evenodd"></path>
            </svg></span>
          <div class="text"><span>Drawing</span></div>
        </button>
      </div>
    </div>
    <div class="PSPDFKit-7t6uf3numwbvg2qg3x9sx7rkjx flex h-[44px] tool-icon">
      <div class="text">
        <span id="downshift-4-label" for="downshift-4-toggle-button">Additional-tools tools, toggle menu</span>
      </div>
      <div class="flex">
        <button
          class="dropdown button-icon PSPDFKit-Toolbar-Button-InkSignature-Annotation PSPDFKit-Toolbar-Button-Signature border-left"
          title="Sign" aria-label="Sign" aria-pressed="false" type="button" @click="openSignModal"
          :disabled="props.screen != 'signOwn' && props.screen != 'sendSign'">
          <span class="tool-button-icon PSPDFKit-Icon-Signature" aria-hidden="true"><svg
              xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              :fill="props.screen != 'signOwn' && props.screen != 'sendSign' ? '#6c757d' : 'currentColor'"
              viewBox="0 0 24 24" focusable="false">
              <path fill-rule="evenodd"
                d="M22.5 15.75h-8.64c.31-1.16.59-2.39.81-3.62.22-1.24.39-2.48.49-3.66.64-.38 1.29-.72 1.95-1 .04.21.08.45.13.72.02.16.05.33.08.5.1.54.22 1.13.38 1.63.09.25.19.51.33.74.13.21.34.46.63.61.32.16.69.08.92-.19.87-1.05 2.74-3.88 3.16-6.87a.747.747 0 0 0-.63-.85.747.747 0 0 0-.85.63c-.29 2.02-1.36 4.02-2.19 5.26-.11-.35-.19-.77-.27-1.22-.02-.14-.05-.29-.07-.44-.07-.37-.13-.73-.19-1.02-.05-.2-.11-.42-.19-.61a1.25 1.25 0 0 0-.22-.33.85.85 0 0 0-.63-.28c-.09 0-.18.02-.26.05-.67.25-1.33.55-1.98.89.01-.57 0-1.11-.03-1.61-.06-.97-.21-1.86-.51-2.52-.29-.67-.83-1.31-1.72-1.31-.65 0-1.56.27-2.5.63-.98.37-2.1.88-3.22 1.45-2.22 1.14-4.53 2.54-5.77 3.6-.31.27-.35.74-.08 1.06.27.31.74.35 1.06.08 1.1-.94 3.28-2.28 5.48-3.4 1.08-.56 2.15-1.04 3.06-1.39.95-.36 1.62-.53 1.97-.53.03 0 .17 0 .35.41.19.43.33 1.11.38 2.01.05.72.04 1.54-.01 2.42-.85.54-1.65 1.14-2.39 1.78-1.74 1.48-3.19 3.18-4 4.79-.2.41-.33.98-.4 1.59H2c-.41 0-.75.34-.75.75s.34.75.75.75h4.86c.01.54.05 1.11.12 1.66.11.88.32 1.77.67 2.46.33.67.91 1.38 1.85 1.38.8 0 1.43-.56 1.9-1.15.48-.62.93-1.47 1.33-2.44.24-.58.47-1.23.69-1.91h9.08c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Zm-11.16 2.84c-.37.91-.76 1.62-1.13 2.09-.39.5-.63.57-.71.57-.06 0-.26-.04-.51-.55-.24-.48-.42-1.18-.53-1.99-.06-.48-.09-.98-.1-1.46h3.48c-.16.47-.33.92-.5 1.34Zm1.85-6.72c-.24 1.33-.54 2.66-.88 3.88H8.45c.06-.44.14-.75.22-.91.69-1.39 1.99-2.94 3.63-4.33.4-.34.81-.67 1.24-.98-.09.76-.21 1.55-.35 2.34ZM1.97 9.97c.29-.29.77-.29 1.06 0l.97.97.97-.97c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-.97.97.97.97c.29.29.29.77 0 1.06-.29.29-.77.29-1.06 0L4 13.06l-.97.97c-.29.29-.77.29-1.06 0a.754.754 0 0 1 0-1.06l.97-.97-.97-.97a.754.754 0 0 1 0-1.06Z"
                clip-rule="evenodd"></path>
            </svg></span></button><button id="downshift-4-toggle-button" aria-haspopup="true" aria-expanded="false"
          aria-labelledby="downshift-4-label downshift-4-toggle-button" class="pl-[5px] pr-[5px]" type="button"
          style="min-width: 0px">
          <span class="tool-button-icon PSPDFKit-6511p928m8fcbcd7nb8arydjxe PSPDFKit-Icon-CaretDown" aria-hidden="true"
            style="width: 12px; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
              fill="currentColor" viewBox="0 0 12 12" focusable="false">
              <path fill-rule="evenodd"
                d="M9.53 3.97a.75.75 0 0 0-1.06 0L6 6.44 3.53 3.97a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 0 0 0-1.06Z"
                clip-rule="evenodd"></path>
            </svg></span>
          <div class="text"><span>Sign</span></div>
        </button>
      </div>
    </div>
    <div class="PSPDFKit-Toolbar-DropdownGroup-Image PSPDFKit-7t6uf3numwbvg2qg3x9sx7rkjx flex h-[44px] tool-icon">
      <div class="text">
        <span id="downshift-5-label" for="downshift-5-toggle-button">Image tools, toggle menu</span>
      </div>
      <div class="flex">
        <label class="dropdown button-icon PSPDFKit-Toolbar-Button-Image-Annotation border-left" title="Image"
          aria-label="Image" type="button" for="hiddle-upload">
          <input id="hiddle-upload" ref="signatureUpload" type="file" @change="onFileChange"  class="hidden" />
          <span class="tool-button-icon PSPDFKit-Icon-Image" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="currentColor" viewBox="0 0 24 24" focusable="false">
              <path
                d="M6.5 10C7.33 10 8 9.33 8 8.5S7.33 7 6.5 7 5 7.67 5 8.5 5.67 10 6.5 10ZM23 15.94V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-2l.03-.03-.03-.03ZM21.5 18c0 .28-.22.5-.5.5H3c-.12 0-.23-.04-.32-.12l3.82-3.82 2.47 2.47a.75.75 0 0 0 1.06 0L16 11.06l5.5 5.5V18Zm0-3.56-4.97-4.97a.75.75 0 0 0-1.06 0L9.5 15.44l-2.47-2.47a.754.754 0 0 0-1.06 0L2.5 16.44V6c0-.28.22-.5.5-.5h18c.28 0 .5.22.5.5v8.44Z">
              </path>
            </svg></span></label>
        <div class="text"><span>Image</span></div>
      </div>
    </div>
    <button class="dropdown button-icon PSPDFKit-Toolbar-Button-Note-Annotation border-left" title="Note"
      aria-label="Note" aria-pressed="false" type="button" @click="createText"
      :disabled="props.screen != 'signOwn' && props.screen != 'sendSign'">
      <span class="tool-button-icon PSPDFKit-Icon-Note" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" viewBox="0 0 24 24" focusable="false">
          <path :fill="props.screen != 'signOwn' && props.screen != 'sendSign' ? '6c757d' : 'currentColor'"
            d="M7.25 9c0-.41.34-.75.75-.75h8c.41 0 .75.34.75.75s-.34.75-.75.75H8c-.41 0-.75-.34-.75-.75ZM8 12.25c-.41 0-.75.34-.75.75s.34.75.75.75h8c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H8Zm11-9H5C3.48 3.25 2.25 4.48 2.25 6v10c0 1.52 1.23 2.75 2.75 2.75h3.47c.4 0 .78.19 1.02.52l1.16 1.63c.66.92 2.01.98 2.75.12l1.57-1.83c.24-.28.59-.44.95-.44H19c1.52 0 2.75-1.23 2.75-2.75V6c0-1.52-1.23-2.75-2.75-2.75ZM20.25 16c0 .69-.56 1.25-1.25 1.25h-3.08c-.8 0-1.57.35-2.09.96l-1.57 1.83c-.1.13-.3.12-.39 0l-1.16-1.63a2.762 2.762 0 0 0-2.24-1.15H5c-.69 0-1.25-.56-1.25-1.25V6c0-.69.56-1.25 1.25-1.25h14c.69 0 1.25.56 1.25 1.25v10Z">
          </path>
        </svg></span>
    </button>
    <div class="PSPDFKit-Toolbar-DropdownGroup-Text PSPDFKit-7t6uf3numwbvg2qg3x9sx7rkjx flex h-[44px] tool-icon">
      <div class="text">
        <span id="downshift-6-label" for="downshift-6-toggle-button">Text tools, toggle menu</span>
      </div>
      <div class="flex">
        <button class="dropdown button-icon PSPDFKit-Toolbar-Button-Text-Annotation border-left" title="Text"
          aria-label="Text" aria-pressed="false" type="button">
          <span class="tool-button-icon PSPDFKit-Icon-Text" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="currentColor" viewBox="0 0 24 24" focusable="false">
              <path
                d="M19.75 3c0-.41-.34-.75-.75-.75s-.75.34-.75.75v18c0 .41.34.75.75.75s.75-.34.75-.75V3ZM5 6.25c-.41 0-.75.34-.75.75s.34.75.75.75h4.25V18c0 .41.34.75.75.75s.75-.34.75-.75V7.75H15c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H5Z">
              </path>
            </svg></span></button><button id="downshift-6-toggle-button" aria-haspopup="true" aria-expanded="false"
          aria-labelledby="downshift-6-label downshift-6-toggle-button" class="pl-[5px] pr-[5px]" type="button"
          style="min-width: 0px">
          <span class="tool-button-icon PSPDFKit-6511p928m8fcbcd7nb8arydjxe PSPDFKit-Icon-CaretDown" aria-hidden="true"
            style="width: 12px; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
              fill="currentColor" viewBox="0 0 12 12" focusable="false">
              <path fill-rule="evenodd"
                d="M9.53 3.97a.75.75 0 0 0-1.06 0L6 6.44 3.53 3.97a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 0 0 0-1.06Z"
                clip-rule="evenodd"></path>
            </svg></span>
          <div class="text"><span>Text</span></div>
        </button>
      </div>
    </div>
    <div class="PSPDFKit-Toolbar-DropdownGroup-Shapes PSPDFKit-7t6uf3numwbvg2qg3x9sx7rkjx flex h-[44px] tool-icon">
      <div class="text">
        <span id="downshift-12-label" for="downshift-12-toggle-button">Shapes tools, toggle menu</span>
      </div>
      <div class="flex">
        <button
          class="dropdown button-icon PSPDFKit-Toolbar-Button-Shape-Annotation PSPDFKit-Toolbar-Button-Line-Annotation border-left"
          title="Line" aria-label="Line" aria-pressed="false" type="button" @click="createCalendar"
          :disabled="props.screen != 'signOwn' && props.screen != 'sendSign'">
          <span class="tool-button-icon PSPDFKit-Icon-Line" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" :fill="props.screen != 'signOwn' && props.screen != 'sendSign' ? '#6c757d' : '#000'"
              width="20" height="20">
              &gt;
              <path
                d="M9,4.5v1H5v22H27V5.5H23v-1H21v1H11v-1Zm-2,3H9v1h2v-1H21v1h2v-1h2v2H7Zm0,4H25v14H7Zm6,2v2h2v-2Zm4,0v2h2v-2Zm4,0v2h2v-2Zm-12,4v2h2v-2Zm4,0v2h2v-2Zm4,0v2h2v-2Zm4,0v2h2v-2Zm-12,4v2h2v-2Zm4,0v2h2v-2Zm4,0v2h2v-2Z"
                :fill="props.screen != 'signOwn' && props.screen != 'sendSign' ? '#6c757d' : '#000'"
                transform="translate(-5 -4.5)"></path>
            </svg></span></button><button id="downshift-12-toggle-button" aria-haspopup="true" aria-expanded="false"
          aria-labelledby="downshift-12-label downshift-12-toggle-button" class="pl-[5px] pr-[5px]" type="button"
          style="min-width: 0px">
          <span class="tool-button-icon PSPDFKit-6511p928m8fcbcd7nb8arydjxe PSPDFKit-Icon-CaretDown" aria-hidden="true"
            style="width: 12px; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
              fill="currentColor" viewBox="0 0 12 12" focusable="false">
              <path fill-rule="evenodd"
                d="M9.53 3.97a.75.75 0 0 0-1.06 0L6 6.44 3.53 3.97a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 0 0 0-1.06Z"
                clip-rule="evenodd"></path>
            </svg></span>
          <div class="text"><span>Line</span></div>
        </button>
      </div>
    </div>
    <button class="dropdown button-icon PSPDFKit-Toolbar-Button-Print border-left" title="Print" aria-label="Print"
      type="button">
      <span class="tool-button-icon PSPDFKit-Icon-Print" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" fill="currentColor" viewBox="0 0 24 24" focusable="false">
          <path
            d="M17.5 9c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1ZM10 15.25c-.41 0-.75.34-.75.75s.34.75.75.75h4c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-4Zm0 3c-.41 0-.75.34-.75.75s.34.75.75.75h4c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-4Zm11-13h-2.25V3.5c0-.97-.78-1.75-1.75-1.75H7c-.97 0-1.75.78-1.75 1.75v1.75H3C1.48 5.25.25 6.48.25 8v8c0 1.52 1.23 2.75 2.75 2.75h2.25V22c0 .97.78 1.75 1.75 1.75h10c.97 0 1.75-.78 1.75-1.75v-3.25H21c1.52 0 2.75-1.23 2.75-2.75V8c0-1.52-1.23-2.75-2.75-2.75ZM6.75 3.5c0-.14.11-.25.25-.25h10c.14 0 .25.11.25.25v1.75H6.75V3.5ZM17.25 22c0 .14-.11.25-.25.25H7c-.14 0-.25-.11-.25-.25v-9c0-.14.11-.25.25-.25h10c.14 0 .25.11.25.25v9Zm5-6c0 .69-.56 1.25-1.25 1.25h-2.25V13c0-.97-.78-1.75-1.75-1.75H7c-.97 0-1.75.78-1.75 1.75v4.25H3c-.69 0-1.25-.56-1.25-1.25V8c0-.69.56-1.25 1.25-1.25h18c.69 0 1.25.56 1.25 1.25v8Z">
          </path>
        </svg></span>
    </button>
    <div class="PSPDFKit-Toolbar-DropdownGroup-Editor PSPDFKit-7t6uf3numwbvg2qg3x9sx7rkjx flex h-[44px] tool-icon">
      <div class="text">
        <span id="downshift-13-label" for="downshift-13-toggle-button">Editor tools, toggle menu</span>
      </div>
      <div class="flex">
        <button class="dropdown button-icon PSPDFKit-Toolbar-Button-Document-Editor border-left" title="Document Editor"
          aria-label="Document Editor" type="button">
          <span class="tool-button-icon PSPDFKit-Icon-DocumentEditor" aria-hidden="true"><svg
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
              focusable="false">
              <path fill-rule="evenodd"
                d="M2.5 2A1.5 1.5 0 0 1 4 .5h8a1.5 1.5 0 0 1 1.06.44l4 4A1.5 1.5 0 0 1 17.5 6v.366a4.024 4.024 0 0 0-.293.266L16 7.84V6h-3a1 1 0 0 1-1-1V2H4v16h2.093c-.22.463-.325.979-.298 1.5H4A1.5 1.5 0 0 1 2.5 18V2Zm20.363 6.782a2.48 2.48 0 0 1 0 3.507L12.32 22.833a1.615 1.615 0 0 1-1.142.473H7.25V19.38c0-.428.17-.839.473-1.142L18.267 7.693a2.48 2.48 0 0 1 3.507 0l1.09 1.09Zm-1.06 2.446a.98.98 0 0 0 0-1.385l-1.09-1.09a.98.98 0 0 0-1.385 0l-1.075 1.075 2.475 2.475 1.075-1.075Zm-2.136 2.136-2.475-2.475-8.408 8.409a.115.115 0 0 0-.034.081v2.427h2.427a.12.12 0 0 0 .082-.033l8.408-8.409Z"
                clip-rule="evenodd"></path>
            </svg></span></button><button id="downshift-13-toggle-button" aria-haspopup="true" aria-expanded="false"
          aria-labelledby="downshift-13-label downshift-13-toggle-button" class="pl-[5px] pr-[5px]" type="button"
          style="min-width: 0px">
          <span class="tool-button-icon PSPDFKit-6511p928m8fcbcd7nb8arydjxe PSPDFKit-Icon-CaretDown" aria-hidden="true"
            style="width: 12px; height: 100%"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
              fill="currentColor" viewBox="0 0 12 12" focusable="false">
              <path fill-rule="evenodd"
                d="M9.53 3.97a.75.75 0 0 0-1.06 0L6 6.44 3.53 3.97a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 0 0 0-1.06Z"
                clip-rule="evenodd"></path>
            </svg></span>
          <div class="text"><span>Document Editor</span></div>
        </button>
      </div>
    </div>
    <button class="dropdown button-icon PSPDFKit-Toolbar-Button-Search border-left" title="Search Document"
      aria-label="Search Document" aria-pressed="false" type="button">
      <span class="tool-button-icon PSPDFKit-Icon-Search" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" fill="currentColor" viewBox="0 0 24 24" focusable="false">
          <path fill-rule="evenodd"
            d="M3.75 10.5a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0Zm6.75-8.25a8.25 8.25 0 1 0 5.28 14.59l4.69 4.69a.75.75 0 0 0 1.06-1.06l-4.69-4.69A8.25 8.25 0 0 0 10.5 2.25Z"
            clip-rule="evenodd"></path>
        </svg></span></button><button class="dropdown button-icon PSPDFKit-Toolbar-Button-Export-PDF border-left"
      title="Export" aria-label="Export" aria-pressed="false" type="button">
      <span class="tool-button-icon PSPDFKit-Icon-ExportPdf" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" fill="currentColor" viewBox="0 0 24 24" focusable="false">
          <path fill-rule="evenodd"
            d="M12 2.25a.75.75 0 0 1 .75.75v13.19l2.72-2.72a.75.75 0 1 1 1.06 1.06L12 19.06l-4.53-4.53a.75.75 0 1 1 1.06-1.06l2.72 2.72V3a.75.75 0 0 1 .75-.75Zm-9 14a.75.75 0 0 1 .75.75v3c0 .69.56 1.25 1.25 1.25h14c.69 0 1.25-.56 1.25-1.25v-3a.75.75 0 0 1 1.5 0v3A2.75 2.75 0 0 1 19 22.75H5A2.75 2.75 0 0 1 2.25 20v-3a.75.75 0 0 1 .75-.75Z"
            clip-rule="evenodd"></path>
        </svg></span>
    </button>
    <div></div>
    <div class="text">
      <input aria-label="Select Image" type="file" accept="image/png, image/jpeg, application/pdf" tabindex="-1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { User } from '@/types/document.interface'
import type { Receiver } from '@/types/send-sign'
import { SIGNATURE_TYPE, type Signature } from '@/types/send-sign'
import { isNumber } from 'element-plus/es/utils/types.mjs'
import { ElNotification, type UploadInstance, type UploadProps } from 'element-plus'
import { SignatureService } from '@/services'

const totalPage = defineModel('totalPage')
const pageNum = defineModel<Number>('pageNum', { required: true })
const signModal = defineModel('signModal')
const users = defineModel<Array<Receiver>>('users')
const scale = defineModel('scale')
const signatures = defineModel<Array<Signature>>('signatures', { required: true })
const receiverId = defineModel('receiverId')
const emit = defineEmits([
  'onNextPage',
  'onPrevPage',
  'scaleUp',
  'scaleDown',
  'note',
  'addCalendar'
])
const signatureUpload = ref()
const props = defineProps({
  screen: { type: String, required: true }
})

const handleCommand = (command: string | number | object) => {
  receiverId.value = command
}

const openSignModal = () => {
  signModal.value = true
}

const onFileChange = async (event) => {
  // upload.value!.clearFiles()
  var form = new FormData()
  form.append('signature', event.target.files[0])
  const response = await SignatureService.create(form)
  const drawSign = response.data.data
  let signature: Signature = {
    type: SIGNATURE_TYPE.IMAGE,
    scale: Number(scale.value),
    page: pageNum.value,
    can_resize: true,
    position: {
      width: 200,
      height: 120,
      top: 0,
      left: 0
    },
    data: {
      id: drawSign.file.id,
      path: drawSign.file.path,
      name: drawSign.file.name
    }
  }
  signatures.value.push(signature)
}

const createCalendar = () => {
  let signature = {
    type: SIGNATURE_TYPE.DATE,
    scale: Number(scale.value),
    page: Number(pageNum.value),
    can_resize: true,
    position: {
      width: 200,
      height: 60,
      top: 50,
      left: 50
    },
    data: Date.now()
  }
  signatures.value.push(signature)
}

const createText = () => {
  let signature = {
    type: SIGNATURE_TYPE.TEXT,
    scale: Number(scale.value),
    page: Number(pageNum.value),
    can_resize: true,
    position: {
      width: 200,
      height: 60,
      top: 50,
      left: 50
    },
    data: 'Some text ...'
  }
  signatures.value.push(signature)
}

const createCheckbox = () => {
  let signature = {
    type: SIGNATURE_TYPE.CHECKBOX,
    scale: Number(scale.value),
    page: Number(pageNum.value),
    can_resize: true,
    position: {
      width: 200,
      height: 60,
      top: 50,
      left: 50
    },
    data: false
  }
  signatures.value.push(signature)
}

const createRadio = () => {
  let signature = {
    type: SIGNATURE_TYPE.RADIO,
    scale: Number(scale.value),
    page: Number(pageNum.value),
    can_resize: true,
    position: {
      width: 200,
      height: 60,
      top: 50,
      left: 50
    },
    data: false
  }
  signatures.value.push(signature)
}

watch(
  () => signatureUpload.value,
  () => {
    console.log(1)
    console.log(signatureUpload.value[0])
  })
</script>

<style lang="css" scoped>
.toolbar {
  background-color: #fcfdfe;
  box-shadow: 0 1px 2px rgba(61, 66, 78, 0.5);
  color: #3d424e;
  flex: 2;
  flex-direction: row;
  font-weight: 400;
  height: 44px;
  min-height: 44px;
  opacity: 1;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  user-select: none;
  white-space: nowrap;
  z-index: 200;
}

.text {
  clip: rect(0, 0, 0, 0);
  border-width: 0;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.tool-button-icon {
  display: flex;
  flex: 24px 0 0;
  flex-direction: column;
  height: 24px;
  justify-content: center;
  width: 24px;
}

.page {
  color: #3d424e;
  cursor: default;
  display: flex;
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  padding: 0 15px;
  user-select: none;
  width: fit-content;
}

.button-icon {
  min-width: 44px;
  padding: 0 11px;
}

.dropdown {
  align-items: center;
  background-color: transparent;
  border: 1px solid transparent;
  color: inherit;
  cursor: pointer;
  display: flex;
  font: inherit;
  justify-content: center;
  line-height: normal;
  padding: 0;
  touch-action: pan-x;
  width: auto;
}

.border-left {
  border-left: #f0f3f9;
  flex-shrink: 0;
}

.tool-icon {
  padding: 0;
  background-color: transparent;
  border: 0;
  height: 44px;
  margin: 0;
}

.input-page {
  background: rgba(61, 66, 78, 0.2);
  border: none;
  color: #3d424e;
  font-size: 0.875rem;
  font-weight: 400;
  margin: 0 1px;
  padding: 4px;
  text-align: center;
  width: 26px;
}

.prev-radius {
  border-radius: 4px 0 0 4px;
}

.page-number {
  background: rgba(61, 66, 78, 0.2);
  border: none;
  color: #3d424e;
  font-size: 0.875rem;
  font-weight: 400;
  margin: 0 1px;
  padding: 4px;
  text-align: center;
  transition: all 0.15s;
  width: 48px;
}

.next {
  align-items: center;
  background: rgba(61, 66, 78, 0.2);
  border: 0;
  color: #3d424e;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 5px 3px;
  touch-action: none;
  transition: all 0.15s;
  width: 26px;
}
</style>
