import axios from 'axios';

// Auth

const f = {
    login: {},
    logout: {},
    getUsers: {},
    getUser: {},
    createUser: {},
    patchUser: {},
    getCharacters: {},
    getCharacter: {},
    createCharacter: {},
    patchCharacters: {},
    getSessions: {},
    getSession: {},
    createSession: {},
    patchSession: {},
    getRolls: {},
    getRoll: {},
    createRoll: {},
    patchRoll: {},
};f;

const logout = async () => {
    const res = await axios.post(`/auth/logout`);
    return res.data;
};

const getUserCharacters = async () => {
    const res = await axios.get(`/api/user/character`);
    return res.data;
};

const getCharacters = async (sessionId) => {
    const res = await axios.get(`/api/character/${sessionId}`);
    return res.data;
};

const getAllCharacters = async (sessionId) => {
    const res = await axios.get(`/api/characters/${sessionId}`);
    return res.data;
};

const createCharacter = async (name, sessionId) => {
    const data = {
        name,
        sessionId,
    };
    return await axios.post(`/api/character`, data);
};

const getSession = async (sessionId) => {
    return await axios.get(`/api/session/${sessionId}`);
};

const getRolls = async (sessionId, characterId) => {
    const res = await axios.get(`/api/roll/session/${sessionId}/character/${characterId}`);
    return res.data;
};

const rollDie = async (sessionId, characterId, dvalue) => {
    const data = {
        sessionId,
        characterId,
        dvalue,
    };
    return await axios.post(`/api/roll`, data);
};

const showRoll = async (rollId) => {
    const res = await axios.post(`/api/roll/${rollId}/show`);
    return res.data;
};

const hideRoll = async (rollId) => {
    const res = await axios.delete(`/api/roll/${rollId}/show`);
    return res.data;
};

const nameRoll = async (rollId, name) => {
    const data = {
        name
    };
    return await axios.post(`/api/roll/${rollId}/name`, data);
};

const deleteRoll = async (rollId) => {
    const res = await axios.delete(`/api/roll/${rollId}`);
    return res.data;
};

const getUser = async () => {
    const res = await axios.get(`/api/user`);
    return res.data;
};

export default {
    logout,
    getUserCharacters,
    getCharacters,
    getAllCharacters,
    createCharacter,
    getSession,
    getRolls,
    rollDie,
    showRoll,
    hideRoll,
    nameRoll,
    deleteRoll,
    getUser,
};
