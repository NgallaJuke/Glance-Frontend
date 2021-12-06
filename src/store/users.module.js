import { userServices } from '../services';
// import router from '../router/index';
const state = {
  user: Object,
  listUsers: Array,
  follower: Array,
  following: Array,
  allUsers: Array,
  status: Boolean,
  follow: Boolean,
  unfollow: Boolean,
};
const getters = {};
const actions = {
  updateAvatar({ dispatch, commit }, avatar) {
    commit('updateAvatarRequest', avatar);
    userServices.updateAvatar(avatar).then(
      (data) => {
        if (data.type === 'success') {
          commit('updateAvatarSuccess', data.data);
          dispatch('alert/success', data.message, { root: true });
          location.reload(true);
        } else {
          commit('updateAvatarFailure', 'Error: Image size too big!');
          dispatch('alert/error', 'Error: Image size too big!', { root: true });
        }
      },
      (error) => {
        commit('updateAvatarFailure', error);
        dispatch('alert/error', error, { root: true });
      }
    );
  },

  updateUser({ dispatch, commit }, user) {
    commit('updateUserRequest', user);
    userServices
      .updateUser(user)
      .then((data) => {
        if (data.type === 'success') {
          commit('updateUserSuccess', data.data);
          dispatch('alert/success', data.message, { root: true });
          location.reload(true);
        } else {
          commit('updateUserFailure', 'Something went wrong');
          dispatch('alert/error', 'error', { root: true });
        }
      })
      .catch((error) => {
        commit('updateUserFailure', error);
        dispatch('alert/error', error, { root: true });
      });
  },

  async getSingleUser({ dispatch, commit }, payload) {
    commit('UserProfilRequest');
    try {
      const data = await userServices.getSingleUser(payload);
      if (data.type === 'success' && payload.userName) {
        commit('UserProfilSuccess', data.data);
      } else {
        commit('UserProfilListSuccess', data.data);
      }
    } catch (error) {
      commit('UserProfilFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async getAllUser({ dispatch, commit }) {
    commit('UsersRequest');
    try {
      const data = await userServices.getAllUser();
      console.log(`allUsers`, data);
      if (data.type === 'success') {
        commit('UsersSuccess', data.data);
      }
    } catch (error) {
      commit('UsersFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async followUser({ dispatch, commit }, userID) {
    commit('followRequest');
    try {
      const data = await userServices.followUser(userID);
      if (data.type === 'success') {
        commit('followSuccess');
        dispatch('alert/success', data.message, { root: true });
      }
    } catch (error) {
      commit('followFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async unfollowUser({ dispatch, commit }, userID) {
    commit('unfollowRequest');
    try {
      const data = await userServices.unFollowUser(userID);
      if (data.type === 'success') {
        commit('unfollowSuccess');
        dispatch('alert/success', data.message, { root: true });
      }
    } catch (error) {
      commit('unfollowFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async getAllFollower({ dispatch, commit }, userid) {
    commit('allFollowerRequest');
    try {
      const data = await userServices.getAllFollower(userid);
      if (data.type === 'success') commit('allFollowerSuccess', data.data);
    } catch (error) {
      commit('allFollowerFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async getAllFollowing({ dispatch, commit }, userid) {
    commit('allFollowingRequest');
    try {
      const data = await userServices.getAllFollowing(userid);
      if (data.type === 'success') commit('allFollowingSuccess', data.data);
    } catch (error) {
      commit('allFollowingFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },
};
const mutations = {
  updateAvatarRequest(state) {
    state.status = { updatingAvatar: true };
  },
  updateAvatarSuccess(state, user) {
    state.status = { updated: true };
    state.user = user;
  },
  updateAvatarFailure(state) {
    state.status = {};
    state.user = null;
  },
  updateUserRequest(state) {
    state.status = { updatingUser: true };
  },
  updateUserSuccess(state, data) {
    state.status = { userUpdated: true };
    state.user = data;
  },
  updateUserFailure(state) {
    state.status = {};
    state.user = null;
  },
  UserProfilRequest(state) {
    state.status = { UserProfilLaoding: true };
  },
  UserProfilSuccess(state, data) {
    state.user = data;
    state.status = { UserProfilLaoded: true };
  },
  UserProfilListSuccess(state, data) {
    state.listUsers.push(data);
  },
  ClearUserProfilList(state) {
    state.listUsers = [];
  },
  UserProfilFailure(state, error) {
    state.user = null;
    state.error = error;
  },
  UsersRequest(state) {
    state.status = { allUsersLaoding: true };
  },
  UsersSuccess(state, data) {
    state.allUsers = data;
    state.status = { allUsersSuccess: true };
  },
  UsersFailure(state, error) {
    state.allUsers = null;
    state.error = error;
  },
  followRequest(state) {
    state.status = { followLaoding: true };
  },
  followSuccess(state) {
    state.status = { followSuccess: true };
  },
  followFailure(state, error) {
    state.error = error;
  },
  unfollowRequest(state) {
    state.status = { unfollowLaoding: true };
  },
  unfollowSuccess(state) {
    state.status = { unfollowSuccess: true };
  },
  unfollowFailure(state, error) {
    state.error = error;
  },

  allFollowerRequest(state) {
    state.status = { allFollowerLaoding: true };
    state.follower = [];
  },
  allFollowerSuccess(state, data) {
    state.status = { allFollowerSuccess: true };
    state.follower = data;
  },
  allFollowerFailure(state, error) {
    state.error = error;
  },
  allFollowingRequest(state) {
    state.status = { allFollowingLaoding: true };
    state.following = [];
  },
  allFollowingSuccess(state, data) {
    state.status = { allFollowingSuccess: true };
    state.following = data;
  },
  allFollowingFailure(state, error) {
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
