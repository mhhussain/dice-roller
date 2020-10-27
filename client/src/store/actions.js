export default {
    userLogin(context, user) {
        context.commit('setUser', user);
    },
    userLogout(context) {
        context.commit('setUser', {});
    },
};
