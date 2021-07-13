import { postServices } from '../services';
// import router from '../router/index';
const state = {
  post: null,
  status: null,
  timeline: [],
  likedPost: [],
  HashtagPost: [],
  DicoverPost: [],
  error: null,
  message: null,
};
const getters = {};
const actions = {
  async createpost({ dispatch, commit }, post) {
    commit('createPostRequest', post);
    try {
      const data = await postServices.createPost(post);
      if (data.type === 'success') {
        commit('createPostSuccess', data.data);
        dispatch('alert/success', data.message, { root: true });
      } else {
        commit('createPostFailure', data.message);
        dispatch('alert/error', data.message, { root: true });
      }
    } catch (error) {
      commit('createPostFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async deletePost({ dispatch, commit }, postID) {
    commit('deletePostRequest', postID);
    try {
      const data = await postServices.deletePost(postID);
      if (data.type === 'success') {
        commit('deletePostSuccess');
        dispatch('alert/success', data.message, { root: true });
        window.location.reload();
      } else {
        commit('deletePostFailure', data.message);
        dispatch('alert/error', data.message, { root: true });
      }
    } catch (error) {
      commit('deletePostFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async likePost({ dispatch, commit }, postID) {
    commit('likePostRequest');
    try {
      const data = await postServices.likePost(postID);
      if (data.type === 'success') {
        commit('likePostSuccess');
        dispatch('alert/success', data.message, { root: true });
      } else {
        commit('likePostFailure', data.message);
        dispatch('alert/error', data.message, { root: true });
      }
    } catch (error) {
      commit('likePostFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async getLikedPost({ dispatch, commit }, id) {
    commit('getLikedPostRequest');
    try {
      const data = await postServices.getLikedPost(id);
      if (data.type === 'success') {
        commit('getLikedPostSuccess', data.data);
      } else {
        commit('getLikedPostEmpty', data.message);
      }
    } catch (error) {
      commit('getLikedPostFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async getHashtagPost({ dispatch, commit }, payload) {
    commit('getHashtagPostRequest');
    try {
      const data = await postServices.getHashtagPost(payload);
      if (data.type === 'success') {
        commit('getHashtagPostSuccess', data.data);
      } else {
        commit('getHashtagPostEmpty', data.message);
      }
    } catch (error) {
      commit('getHashtagPostFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async disLikePost({ dispatch, commit }, postID) {
    commit('disLikePostRequest');
    try {
      const data = await postServices.disLikePost(postID);
      if (data.type === 'success') {
        commit('disLikePostSuccess');
        dispatch('alert/success', data.message, { root: true });
      } else {
        commit('disLikePostFailure', 'Error: Error Like Post');
        dispatch('alert/error', 'error', { root: true });
      }
    } catch (error) {
      commit('disLikePostFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async getDiscoverPost({ dispatch, commit }, limit) {
    commit('postDiscoveredRequest');
    try {
      const data = await postServices.getDiscoverPost(limit);

      if (data.type === 'success' && Object.keys(data.data).length === 0 && data.data.constructor === Object) {
        commit('postDiscoveredEmpty', 'Your Timeline is empty.');
        return;
      }
      if (data.type === 'success') commit('postDiscoveredSuccess', data.data);
    } catch (error) {
      commit('postDiscoveredFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async getPostFeed({ dispatch, commit }, paylaod) {
    commit('postFeedRequest');
    try {
      let data = {};
      if (paylaod.userName && paylaod.limit) {
        data = await postServices.getPostFeed(paylaod.timeline, paylaod.userName, paylaod.limit);
      } else if (paylaod.userName) {
        data = await postServices.getPostFeed(paylaod.timeline, paylaod.userName);
      } else {
        data = await postServices.getPostFeed(paylaod.timeline);
      }

      if (data.type === 'success' && Object.keys(data.data).length === 0 && data.data.constructor === Object) {
        commit('postFeedEmpty', 'Your Timeline is empty');
        return;
      }
      if (data.type === 'success') commit('postFeedSuccess', data.data);
    } catch (error) {
      commit('postFeedFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },
};

const mutations = {
  createPostRequest(state, data) {
    state.status = { postCreating: true };
    state.post = data;
  },
  createPostSuccess(state, data) {
    state.status = { postCreated: true };
    state.post = data;
    state.timeline.push(data);
    state.error = null;
  },
  createPostFailure(state, error) {
    state.error = error;
    state.post = null;
    state.status = null;
  },
  deletePostRequest(state, data) {
    state.status = { deletingPost: true };
    state.post = data;
  },
  deletePostSuccess(state) {
    state.status = { postDeleted: true };
  },
  deletePostFailure(state, error) {
    state.error = error;
    state.post = null;
    state.status = null;
  },
  likePostRequest(state) {
    state.status = { likingPost: true };
  },
  likePostSuccess(state) {
    state.status = { postLiked: true };
  },
  likePostFailure(state, error) {
    state.error = error;
  },
  disLikePostRequest(state) {
    state.status = { disLikingPost: true };
  },
  disLikePostSuccess(state) {
    state.status = { postDisLiked: true };
  },
  disLikePostFailure(state, error) {
    state.error = error;
  },
  postFeedRequest(state) {
    state.status = { loading: true };
  },
  postFeedSuccess(state, data) {
    state.timeline = data;
    state.status = { isLoaded: true };
  },
  postFeedEmpty(state, message) {
    state.message = message;
    state.post = null;
    state.status = { empty: true };
    state.error = null;
  },
  postFeedFailure(state, error) {
    state.timeline = null;
    state.error = error;
    state.status = { error: true };
  },
  UserHomeTimelineRequest(state) {
    state.status = { loading: true };
  },
  UserHomeTimelineSuccess(state, data) {
    state.hometimeline = data;
    state.status = { isLoaded: true };
    state.post = null;
    state.error = null;
  },
  UserHomeTimelineEmpty(state, message) {
    state.message = message;
    state.post = null;
    state.status = { empty: true };
    state.error = null;
    state.hometimeline = null;
  },
  UserHomeTimelineFailure(state, error) {
    state.hometimeline = null;
    state.error = error;
    state.status = { error: true };
  },
  getLikedPostRequest(state) {
    state.status = { loading: true };
  },
  getLikedPostSuccess(state, likedPost) {
    state.status = { isLoaded: true };
    state.likedPost = likedPost.likedPost;
    state.error = null;
  },
  getLikedPostEmpty(state, message) {
    state.message = message;
    state.status = { empty: true };
    state.error = null;
  },
  getLikedPostFailure(state, error) {
    state.error = error;
    state.status = { error: true };
  },

  getHashtagPostRequest(state) {
    state.status = { loading: true };
  },
  getHashtagPostSuccess(state, data) {
    state.status = { isLoaded: true };
    state.HashtagPost = data;
    state.error = null;
  },
  getHashtagPostEmpty(state, message) {
    state.message = message;
    state.status = { empty: true };
    state.error = null;
  },
  getHashtagPostFailure(state, error) {
    state.error = error;
    state.status = { error: true };
  },
  postDiscoveredRequest(state) {
    state.status = { loading: true };
  },
  postDiscoveredSuccess(state, data) {
    state.status = { isLoaded: true };
    state.postDiscovered = data;
    state.error = null;
  },
  postDiscoveredEmpty(state, message) {
    state.message = message;
    state.status = { empty: true };
    state.error = null;
  },
  postDiscoveredFailure(state, error) {
    state.error = error;
    state.status = { error: true };
  },
};

export const posts = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
