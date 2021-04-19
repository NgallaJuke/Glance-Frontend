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
    authServices
      .register(user)
      .then((user) => {
        commit('registerSuccess', user);
        router.push('/login');
        setTimeout(() => {
          // display success message after route change completes
          dispatch('alert/success', 'Registration successful. Please check your email to confirm your registration!', {
            root: true,
          });
        });
      })
      .catch((error) => {
        commit('registerFailure', error);
        dispatch('alert/error', error, { root: true });
      });
  },

  login({ dispatch, commit }, credentials) {
    commit('loginRequest', credentials);
    authServices
      .login(credentials)
      .then(() => {
        dispatch('getCurrentUser');
        commit('loginSuccess');
        router.push('/');
      })
      .catch((error) => {
        commit('loginFailure', error);
        dispatch('alert/error', error, { root: true });
      });
  },

  logout({ dispatch, commit }) {
    commit('logoutRequest');
    authServices.logout().then(
      (response) => {
        if (response.success) {
          commit('logoutSuccess');
          router.push('/login');
        }
      },
      (error) => {
        commit('logoutFailure', error);
        dispatch('alert/error', error, { root: true });
      }
    );
  },

  async getCurrentUser({ dispatch, commit }) {
    commit('UserProfilRequest');
    try {
      const UserProfil = await userServices.getCurrentUser();
      commit('UserProfilSuccess', UserProfil);
    } catch (error) {
      commit('UserProfilFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async changePassword({ dispatch, commit }, user) {
    commit('ChangePasswordRequest');
    try {
      const UserProfil = await authServices.changePassword(user);
      commit('ChangePasswordSuccess', UserProfil);
      dispatch('alert/success', 'Password Changed Successfully', { root: true });
      // location.reload(true);
    } catch (error) {
      commit('ChangePasswordFailure', error);
      dispatch('alert/error', error, { root: true });
    }
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
  loginSuccess(state) {
    state.status = { loggedIn: true };
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logoutRequest(state) {
    state.status = { loggingOut: true };
  },
  logoutSuccess(state) {
    state.status = { loggedOut: true };
    state.user = null;
  },
  logoutFailure(state) {
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
    state.status = { NoUser: true };
    state.error = error;
  },
  ChangePasswordRequest(state) {
    state.status = { ChangingPassword: true };
  },
  ChangePasswordSuccess(state, userProfil) {
    state.user = userProfil;
    state.status = { PasswordChanged: true, loggedIn: true };
  },
  ChangePasswordFailure(state, error) {
    state.user = null;
    state.status = { FailedChangePassword: true, loggedIn: true };
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
