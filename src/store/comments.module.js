import { commentServices } from '../services';
const state = { comment: [], post: null, status: null, error: null };
const getters = {};
const actions = {
  async makeComment({ dispatch, commit }, payload) {
    commit('makeCommentRequest');
    try {
      const data = await commentServices.makeComment(payload);
      if (data.success) {
        commit('makeCommentSuccess', { comment: data.comment, postID: payload.postID });
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
  makeCommentSuccess(state, { comment, postID }) {
    state.status = { postCommented: true };
    state.comment.push(comment);
    state.post = postID;
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
