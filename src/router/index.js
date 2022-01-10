import { createRouter, createWebHistory } from "vue-router"
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Create from '../views/Create.vue'
import Detail from '../views/Detail.vue'
import ListView from '../views/ListView.vue'

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
    },
    {
        path: '/view/:category',
        name: 'ListView',
        component: ListView,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router