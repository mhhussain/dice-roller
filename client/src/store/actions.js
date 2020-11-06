export default {
    userLogin(context, user) {
        context.commit('setUser', user);
        context.commit('setAuthorized');
    },
    userLogout(context) {
        context.commit('setUser', {});
    },
    raiseError(context, error) {
        const newError = error;
        context.commit('setError', newError);
        setTimeout(() => {
            context.commit('setError', null);
        }, 5000);
    },
};
