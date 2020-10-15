import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '../views/Login.vue';
import HomeView from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/register',
        redirect: '/login',
    },
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { requiresAuth: true },
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(rec => rec.meta.requiresAuth);
    const isAuthenticated = true;
    if (requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
