import axios from 'axios';

// Auth
const login = async ({ email, password }) => {
    const res = await axios.post(`/auth/login`, { email, password });
    return res;
};

const logout = async () => {
    const res = await axios.post(`/auth/logout`);
    return res.data;
};

export default {
    login,
    logout,
};
