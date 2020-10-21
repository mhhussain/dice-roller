import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import LoginView from '../views/Login.vue';
import HomeView from '../views/Home.vue';
import CharacterView from '../views/Character.vue';
import DiceRollerView from '../views/DiceRoller.vue';

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
    {
        path: '/session/:id/character',
        name: 'character',
        component: CharacterView,
        meta: { requiresAuth: true },
    },
    {
        path: '/session/:sessionId/character/:characterId',
        name: 'diceroller',
        component: DiceRollerView,
        meta: { requiresAuth: true },
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(rec => rec.meta.requiresAuth);
    if(requiresAuth) {
        axios.get('/auth/ping')
            .then(() => {
                next();
            })
            .catch(() => {
                next('/login');
            });
    } else {
        next();
    }
});

export default router;
