import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import LoginView from '../views/Login.vue';
import HomeView from '../views/Home.vue';
import FindCreateSessionView from '../views/FindCreateSession.vue';
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
        path: '/session',
        name: 'findcreatesession',
        component: FindCreateSessionView,
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
    const { isAuthorized } = store.state;
    if(requiresAuth) {
        if (isAuthorized) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;
