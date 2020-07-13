import { userServices } from '../services';
// import router from '../router/index';
const state = {
  user: null,
  allUsers: null,
  status: null,
  follow: Boolean,
  unfollow: Boolean,
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
          location.reload(true);
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
  async getAllUser({ dispatch, commit }) {
    commit('UsersRequest');
    try {
      const allUsers = await userServices.getAllUser();
      if (allUsers) {
        commit('UsersSuccess', allUsers);
      }
    } catch (error) {
      commit('UsersFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },
  async followUser({ dispatch, commit }, userID) {
    commit('followRequest');
    try {
      const follow = await userServices.followUser(userID);
      if (follow.success) {
        commit('followSuccess', follow.success);
      }
    } catch (error) {
      commit('followFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },
  async unfollowUser({ dispatch, commit }, userID) {
    commit('unfollowRequest');
    try {
      const unfollow = await userServices.unFollowUser(userID);
      if (unfollow.success) {
        commit('unfollowSuccess', unfollow.success);
      }
    } catch (error) {
      commit('unfollowFailure', error);
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
    state.status = { UserProfilLaoding: true };
  },
  UserProfilSuccess(state, userProfil) {
    state.user = userProfil;
    state.status = { loggedIn: true };
  },
  UserProfilFailure(state, error) {
    state.user = null;
    state.error = error;
  },
  UsersRequest(state) {
    state.status = { allUsersLaoding: true };
  },
  UsersSuccess(state, allUsers) {
    state.allUsers = allUsers;
    state.status = { allUsersSuccess: true };
  },
  UsersFailure(state, error) {
    state.allUsers = null;
    state.error = error;
  },
  followRequest(state) {
    state.status = { followLaoding: true };
  },
  followSuccess(state, follow) {
    state.status = { followSuccess: follow };
  },
  followFailure(state, error) {
    state.error = error;
  },
  unfollowRequest(state) {
    state.status = { unfollowLaoding: true };
  },
  unfollowSuccess(state, unfollow) {
    state.status = { unfollowSuccess: unfollow };
  },
  unfollowFailure(state, error) {
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
