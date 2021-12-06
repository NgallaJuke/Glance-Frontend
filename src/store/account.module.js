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
      .then((data) => {
        commit('registerSuccess', data);
        router.push('/register-success');
        setTimeout(() => {
          // display success message after route change completes
          dispatch('alert/success', data.message, {
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
      (data) => {
        if (data.type === 'success') {
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
      const data = await userServices.getCurrentUser();
      console.log('User', data);
      if (data.type === 'success') commit('UserProfilSuccess', data.data);
    } catch (error) {
      commit('UserProfilFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async changePassword({ dispatch, commit }, user) {
    commit('ChangePasswordRequest');
    try {
      const data = await authServices.changePassword(user);
      commit('ChangePasswordSuccess', data.data);
      dispatch('alert/success', data.message, { root: true });
      // location.reload(true);
    } catch (error) {
      commit('ChangePasswordFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },
  async deleteAccount({ dispatch, commit }) {
    commit('deleteAccountRequest');
    authServices
      .deleteAccount()
      .then((data) => {
        if (data.type === 'success') {
          commit('deleteAccountSuccess', data.message);
          dispatch('alert/success', data.message, { root: true });
          router.push('/login');
        } else {
          commit('deleteAccountFailure', 'Something went wrong');
          dispatch('alert/error', 'Something went wrong', { root: true });
        }
      })
      .catch((error) => {
        commit('deleteAccountFailure', error);
        dispatch('alert/error', error, { root: true });
      });
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
  UserProfilSuccess(state, data) {
    state.user = data;
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
  ChangePasswordSuccess(state, data) {
    state.user = data;
    state.status = { PasswordChanged: true, loggedIn: true };
  },
  ChangePasswordFailure(state, error) {
    state.user = null;
    state.status = { FailedChangePassword: true, loggedIn: true };
    state.error = error;
  },
  deleteAccountRequest(state) {
    state.status = { DeletingAccount: true };
  },
  deleteAccountSuccess(state) {
    state.status = { AccountDeleted: true };
  },
  deleteAccountFailure(state, error) {
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
