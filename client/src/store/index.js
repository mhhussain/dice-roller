import Vue from 'vue';
import Vuex from 'vuex';
import client, { makeAuthPlugin, makeServicePlugin, FeathersVuex } from '../feathers';

import UserModel from '../models/users';
import SessionModel from '../models/sessions';
import CharacterModel from '../models/characters';
import RollModel from '../models/rolls';

import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
    state: {
        appName: 'Dice Roller',
        user: {},
        isAuthorized: false,
        error: null,
        sidebar: {
            drawerOpen: false,
            drawerItems: [
                { name: 'home', title: 'Home' },
                { name: 'home', title: 'Sessions' },
                { name: 'findcreatesession', title: 'Find or create session' },
                { name: 'charactercreate', title: 'Character Creator' },
            ],
        },
    },
    mutations: mutations,
    actions: actions,
    plugins: [
        makeServicePlugin({
            Model: UserModel,
            service: client.service('users'),
            servicePath: 'users',
        }),
        makeServicePlugin({
            Model: SessionModel,
            service: client.service('sessions'),
            servicePath: 'sessions',
        }),
        makeServicePlugin({
            Model: CharacterModel,
            service: client.service('characters'),
            servicePath: 'characters',
        }),
        makeServicePlugin({
            Model: RollModel,
            service: client.service('rolls'),
            servicePath: 'rolls',
        }),
        makeAuthPlugin({ userService: 'users' }),
    ],
});
