import { createRouter, createWebHistory } from "vue-router"
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Create from '../views/Create.vue'
import Detail from '../views/Detail.vue'

const routes = [
    {
        path:'/',
        name: 'Welcome',
        component: Welcome,
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/create',
        name: 'Create',
        component: Create,
        props: true
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router