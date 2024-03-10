import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import CKEditor from '@ckeditor/ckeditor5-vue'
import VueDragResize from 'vue-drag-resize'
import VueSignaturePad from 'vue-signature-pad'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus).use(CKEditor)
app.use(VueAxios, axios)
app.use(VueDragResize)
app.use(VueSignaturePad)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
