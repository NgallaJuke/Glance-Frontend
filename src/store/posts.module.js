import { postServices } from '../services';
// import router from '../router/index';
const state = { post: null, status: null, timeline: null, error: null };
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
    const UserTimeline = await postServices.getUserTimeline();
    if (UserTimeline) {
      commit('UserTimelineSuccess', UserTimeline);
    } else {
      const error = 'Error getting UserTimeline.';
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
  },
  createPostFailure(state, error) {
    state.post = null;
    state.status = {};
    state.error = error;
  },
  UserTimelineRequest(state) {
    state.status = { laoding: true };
  },
  UserTimelineSuccess(state, userTimeline) {
    state.timeline = userTimeline;
    state.status = { isLoad: true };
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
