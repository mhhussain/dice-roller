export default {
    setUser(state, value) {
        state.user = value;
    },
    setAuthorized(state) {
        state.isAuthorized = true;
    },
    setError(state, error) {
        state.error = error;
    },
};
