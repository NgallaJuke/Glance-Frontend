import { commentServices } from '../services';
const state = { comment: [], comments: [], post: null, status: null, error: null };

const getters = {
  orderedComments: (state) => {
    return state.comments.slice().sort((a, b) => b.createdAt - a.createdAt);
  },
};

const actions = {
  async makeComment({ dispatch, commit }, payload) {
    commit('makeCommentRequest');
    try {
      let data = await commentServices.makeComment(payload);
      if (data.success) {
        data.comment.user = payload.user;
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

  async getAllPostComments({ dispatch, commit }, postID) {
    commit('getAllPostCommentsRequest');
    try {
      const data = await commentServices.getAllPostComments(postID);
      if (data.success) {
        commit('getAllPostCommentsSuccess', { comments: data.comments, postID });
      } else {
        commit('getAllPostCommentsFailure', 'Error: Error comment Post');
        dispatch('alert/error', 'error', { root: true });
      }
    } catch (error) {
      commit('getAllPostCommentsFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async deleteComment({ dispatch, commit }, payload) {
    commit('deleteCommentRequest');
    try {
      let data = await commentServices.deleteComment(payload);
      if (data.success) {
        commit('deleteCommentSuccess');
        dispatch('alert/success', 'Comment deleted successfully', { root: true });
      } else {
        commit('deleteCommentFailure', 'Error: Error comment Post');
        dispatch('alert/error', 'error', { root: true });
      }
    } catch (error) {
      commit('deleteCommentFailure', error);
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
    state.comments.push(comment);
    state.post = postID;
    state.error = null;
  },
  makeCommentFailure(state, error) {
    state.error = error;
    state.comment = null;
    state.status = { CommentFailed: true };
  },
  deleteCommentRequest(state) {
    state.status = { deletingPost: true };
  },
  deleteCommentSuccess(state) {
    state.status = { commentDeleted: true };
    state.post = null;
    state.error = null;
  },
  deleteCommentFailure(state, error) {
    state.error = error;
    state.comment = null;
    state.status = { CommentFailed: true };
  },
  getAllPostCommentsRequest(state) {
    state.status = { gettingPostComments: true };
  },
  getAllPostCommentsSuccess(state, { comments, postID }) {
    state.status = { gotPostComments: true };
    state.comments = comments;
    state.post = postID;
    state.error = null;
  },
  getAllPostCommentsFailure(state, error) {
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
