import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Products from '@/views/Products.vue'
import ProductCreate from '@/views/ProductCreate.vue'
import ProductUpdate from '@/views/ProductUpdate.vue'
import ProductDelete from '@/views/ProductDelete.vue'

const routes: Array<RouteRecordRaw> = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    { path: '/products', component: Products},
    { path: '/productcreate', component: ProductCreate},
    { path: '/productedit/:id', component: ProductUpdate},
    { path: '/productdelete:id', component: ProductDelete},
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
