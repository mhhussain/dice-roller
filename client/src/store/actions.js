export default {
    userLogin(context, user) {
        context.commit('setUser', user);
        context.commit('setAuthorized');
    },
    userLogout(context) {
        context.commit('setUser', {});
    },
};
