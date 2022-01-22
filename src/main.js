import { createApp } from 'vue'
import { onAuthStateChanged } from '@firebase/auth'
import { projectAuth } from './firebase/config'
import App from './App.vue'

import '/node_modules/ress/ress.css'
import './assets/css/main.scss'
import router from './router'

let app

onAuthStateChanged(projectAuth, () => {
    if(!app) {
        app = createApp(App)
        .use(router)
        .mount('#app')
    }
})
