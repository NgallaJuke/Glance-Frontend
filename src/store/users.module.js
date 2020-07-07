import { userServices } from '../services';
// import router from '../router/index';
const state = {
  user: {},
  status: {},
};
const getters = {};
const actions = {
  updateAvatar({ dispatch, commit }, avatar) {
    commit('updateAvatarRequest', avatar);
    userServices.updateAvatar(avatar).then(
      (data) => {
        if (data !== undefined) {
          commit('updateAvatarSuccess', data.user);
          dispatch('alert/success', 'Avatar Updated Successfully.', { root: true });
          location.reload();
        } else {
          commit('updateAvatarFailure', 'Error: Image size too big!');
          dispatch('alert/error', 'error', { root: true });
        }
      },
      (error) => {
        commit('updateAvatarFailure', error);
        dispatch('alert/error', error, { root: true });
      }
    );
  },
  async getSingleUser({ dispatch, commit }, userName) {
    commit('UserProfilRequest');
    try {
      const UserProfil = await userServices.getSingleUser(userName);
      if (UserProfil) {
        commit('UserProfilSuccess', UserProfil);
      }
    } catch (error) {
      commit('UserProfilFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },
};
const mutations = {
  updateAvatarRequest(state) {
    state.status = { updating: true };
  },
  updateAvatarSuccess(state, user) {
    state.status = { updated: true };
    state.user = user;
  },
  updateAvatarFailure(state) {
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

export const users = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
