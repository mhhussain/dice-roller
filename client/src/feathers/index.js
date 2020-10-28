import feathers from '@feathersjs/feathers';
import feathersVuex from 'feathers-vuex';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';

const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5001/';

const socket = io(url, {
    transports: ['websocket'],
});

const client = feathers()
    .configure(socketio(socket))
    .configure(auth({
        storage: window.localStorage,
    }));

export default client;

const {
    makeServicePlugin,
    makeAuthPlugin,
    BaseModel,
    models,
    FeathersVuex,
} = feathersVuex(client, {
    serverAlias: 'api',
    idField: '_id',
});

export { makeServicePlugin, makeAuthPlugin, BaseModel, models, FeathersVuex };
