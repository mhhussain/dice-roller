import axios from 'axios';

const getCharacters = async (sessionId) => {
    const res = await axios.get(`/api/character/${sessionId}`);
    return res.data;
};

export default {
    getCharacters
};
