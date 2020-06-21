import { authServices, userServices } from '../services';
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
  login({ dispatch, commit }, credentials) {
    commit('loginRequest', credentials);
    authServices.login(credentials).then(
      (user) => {
        commit('loginSuccess', user);
        router.push('/');
      },
      (error) => {
        commit('loginFailure', error);
        dispatch('alert/error', error, { root: true });
      }
    );
  },
  getCurrentUser({ dispatch, commit }) {
    commit('UserProfilRequest');
    userServices.getCurrentUser().then(
      (userProfil) => {
        console.log('UserProfil', userProfil);
        commit('UserProfilSuccess', userProfil);
      },
      (error) => {
        commit('UserProfilFailure', error);
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
  loginRequest(state) {
    state.status = { loggingIn: true };
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  UserProfilRequest(state) {
    state.status = { laoding: true };
  },
  UserProfilSuccess(state, userProfil) {
    state.user = userProfil;
    state.status = { loggedIn: true };
  },
  UserProfilFailure(state, error) {
    state.user = null;
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
