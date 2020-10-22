import axios from 'axios';

const getCharacters = async (sessionId) => {
    const res = await axios.get(`/api/character/${sessionId}`);
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
    return await axios.get(`/api/roll/session/${sessionId}/character/${characterId}`);
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
    return await axios.post(`/api/roll/${rollId}/show`);
};

const hideRoll = async (rollId) => {
    return await axios.delete(`/api/roll/${rollId}/show`);
};

const nameRoll = async (rollId, name) => {
    const data = {
        name
    };
    return await axios.post(`/api/roll/${rollId}/name`, data);
};

export default {
    getCharacters,
    createCharacter,
    getSession,
    getRolls,
    rollDie,
    showRoll,
    hideRoll,
    nameRoll,
};
