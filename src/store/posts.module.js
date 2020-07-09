import { postServices } from '../services';
// import router from '../router/index';
const state = { post: null, status: null, timeline: null, error: null, message: null };
const getters = {};
const actions = {
  createpost({ dispatch, commit }, post) {
    commit('createPostRequest', post);
    postServices.createPost(post).then(
      (post) => {
        if (post !== undefined) {
          commit('createPostSuccess', post);
          dispatch('alert/success', 'Post created successfully.', { root: true });
        } else {
          commit('createPostFailure', 'Error: Image size too big!');
          dispatch('alert/error', 'error', { root: true });
        }
      },
      (error) => {
        commit('createPostFailure', error);
        dispatch('alert/error', error, { root: true });
      }
    );
  },
  async getUserTimeline({ dispatch, commit }) {
    commit('UserTimelineRequest');
    try {
      const UserTimeline = await postServices.getUserTimeline();
      if (UserTimeline) {
        commit('UserTimelineSuccess', UserTimeline);
      } else {
        const message = 'Your Home Timeline is empty. Please follow some users.';
        commit('UserTimelineEmpty', message);
      }
    } catch (error) {
      commit('UserTimelineFailure', error);
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
  UserTimelineRequest(state) {
    state.status = { laoding: true };
  },
  UserTimelineSuccess(state, userTimeline) {
    state.timeline = userTimeline;
    state.status = { isLoaded: true };
    state.post = null;
    state.error = null;
  },
  UserTimelineEmpty(state, message) {
    state.message = message;
    state.post = null;
    state.status = { empty: true };
    state.error = null;
    state.timeline = null;
  },
  UserTimelineFailure(state, error) {
    state.timeline = null;
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
