import { commentServices } from '../services';
const state = { comment: null, status: null, error: null };
const getters = {};
const actions = {
  async makeComment({ dispatch, commit }, payload) {
    commit('makeCommentRequest');
    try {
      const data = await commentServices.makeComment(payload);
      if (data.success) {
        commit('makeCommentSuccess', data);
        dispatch('alert/success', 'Post commented successfully', { root: true });
      } else {
        commit('makeCommentFailure', 'Error: Error comment Post');
        dispatch('alert/error', 'error', { root: true });
      }
    } catch (error) {
      commit('makeCommentFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },
};

const mutations = {
  makeCommentRequest(state) {
    state.status = { commentingPost: true };
  },
  makeCommentSuccess(state, comment) {
    state.status = { postCommente: true };
    state.comment = comment;
    state.error = null;
  },
  makeCommentFailure(state, error) {
    state.error = error;
    state.comment = null;
    state.status = { CommentFailed: true };
  },
};

export const comments = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
