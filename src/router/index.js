import { createRouter, createWebHistory } from "vue-router"
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Create from '../views/Create.vue'
import Detail from '../views/Detail.vue'
import ListView from '../views/ListView.vue'
import NotFound from '../views/NotFound.vue'
import { projectAuth } from "../firebase/config"

const requireAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    if (!user) {
        next({ name: 'Welcome'})
    } else {
        next()
    }
}

const requireNoAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    if (user) {
        next ({ name: 'Home' })
    } else {
        next()
    }
}

const routes = [
    {
        path:'/',
        name: 'Welcome',
        component: Welcome,
        beforeEnter: requireNoAuth
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { transition: 'slide-left' },
        beforeEnter: requireAuth
    },
    {
        path: '/create',
        name: 'Create',
        component: Create,
        props: true,
        beforeEnter: requireAuth
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail,
        props: true,
        beforeEnter: requireAuth
    },
    {
        path: '/view/:category',
        name: 'ListView',
        component: ListView,
        props: true,
        meta: { transition: 'slide-right'},
        beforeEnter: requireAuth
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router