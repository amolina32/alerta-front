import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    onSession: false,
    userId: "",
    email: "",
  },
  mutations: {
    changeSession(state, payload) {
      state.onSession = payload;
    },
    setUserId(state, payload) {
      state.userId = payload;
    },
  },
  getters: {
    getOnSession: (state) => state.onSession,
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
