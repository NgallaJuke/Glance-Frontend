import { postServices } from '../services';
// import router from '../router/index';
const state = { post: null, status: null, timeline: null, error: null, message: null };
const getters = {};
const actions = {
  async createpost({ dispatch, commit }, post) {
    commit('createPostRequest', post);
    try {
      const newPost = await postServices.createPost(post);
      if (newPost.success) {
        commit('createPostSuccess', newPost);
        dispatch('alert/success', 'Post created successfully.', { root: true });
      } else {
        commit('createPostFailure', 'Error: Image size too big!');
        dispatch('alert/error', 'error', { root: true });
      }
    } catch (error) {
      commit('createPostFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async likePost({ dispatch, commit }, postID) {
    commit('likePostRequest');
    try {
      const data = await postServices.likePost(postID);
      if (data.success) {
        commit('likePostSuccess');
        dispatch('alert/success', 'Post liked successfully.', { root: true });
      } else {
        commit('likePostFailure', 'Error: Error Like Post');
        dispatch('alert/error', 'error', { root: true });
      }
    } catch (error) {
      commit('likePostFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async getPostFeed({ dispatch, commit }, timeline) {
    commit('postFeedRequest');
    try {
      const postFeed = await postServices.getPostFeed(timeline);
      if (postFeed.success) {
        commit('postFeedSuccess', postFeed.timeline);
      } else {
        const message = 'Your Home Timeline is empty. Please follow some users.';
        commit('postFeedEmpty', message);
      }
    } catch (error) {
      commit('postFeedFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },
};
const mutations = {
  createPostRequest(state, post) {
    state.status = { postCreating: true };
    state.post = post;
  },
  createPostSuccess(state, post) {
    state.status = { postCreated: true };
    state.post = post;
    state.timeline.push(post.post);
    state.error = null;
  },
  createPostFailure(state, error) {
    state.error = error;
    state.post = null;
    state.status = null;
    state.timeline = null;
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
  postFeedRequest(state) {
    state.status = { laoding: true };
  },
  postFeedSuccess(state, timeline) {
    state.timeline = timeline;
    state.status = { isLoaded: true };
  },
  postFeedEmpty(state, message) {
    state.message = message;
    state.post = null;
    state.status = { empty: true };
    state.error = null;
    state.timeline = null;
  },
  postFeedFailure(state, error) {
    state.timeline = null;
    state.error = error;
    state.status = { error: true };
  },
  UserHomeTimelineRequest(state) {
    state.status = { laoding: true };
  },
  UserHomeTimelineSuccess(state, userTimeline) {
    state.hometimeline = userTimeline;
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
};

export const posts = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
