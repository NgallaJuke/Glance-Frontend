import { authServices } from '../services';
import router from '../router/index';
const state = {
  user: {},
  status: {},
};
const getters = {};
const actions = {
  register({ dispatch, commit }, user) {
    commit('registerRequest', user);
    authServices.register(user).then(
      (user) => {
        commit('registerSuccess', user);
        router.push('/login');
        setTimeout(() => {
          // display success message after route change completes
          dispatch('alert/success', 'Registration successful', { root: true });
        });
      },
      (error) => {
        commit('registerFailure', error);
        dispatch('alert/error', error, { root: true });
      }
    );
  },
};
const mutations = {
  registerRequest(state, user) {
    state.status = { registering: true };
    state.user = user;
  },
  registerSuccess(state, user) {
    state.status = { registered: true };
    state.user = user;
  },
  registerFailure(state, error) {
    state.status = {};
    state.error = error;
  },
};

export const account = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
