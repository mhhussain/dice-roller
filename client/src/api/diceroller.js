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

export default {
    getCharacters,
    createCharacter,
    getSession,
};
