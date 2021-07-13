import { commentServices } from '../services';
const state = { comment: [], comments: [], post: null, status: null, error: null };

const getters = {
  orderedComments: (state) => {
    return state.comments.slice().sort((a, b) => b.createdAt - a.createdAt);
  },
};

const actions = {
  async getAllPostComments({ dispatch, commit }, postID) {
    commit('getAllPostCommentsRequest');
    try {
      const data = await commentServices.getAllPostComments(postID);
      if (data.type === 'success') {
        commit('getAllPostCommentsSuccess', data.data);
      } else {
        commit('getAllPostCommentsFailure', 'Error getting all comments in post');
        dispatch('alert/error', 'Error getting all comments in post', { root: true });
      }
    } catch (error) {
      commit('getAllPostCommentsFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async makeComment({ dispatch, commit }, payload) {
    commit('makeCommentRequest');
    try {
      let data = await commentServices.makeComment(payload);
      if (data.type === 'success') {
        commit('makeCommentSuccess', data.data);
        dispatch('alert/success', data.message, { root: true });
      } else {
        commit('makeCommentFailure', 'Could not create the comment');
        dispatch('alert/error', 'Could not create the comment', { root: true });
      }
    } catch (error) {
      commit('makeCommentFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async deleteComment({ dispatch, commit }, payload) {
    commit('deleteCommentRequest');
    try {
      let data = await commentServices.deleteComment(payload);
      if (data.type === 'success') {
        commit('deleteCommentSuccess');
        dispatch('alert/success', data.message, { root: true });
      } else {
        commit('deleteCommentFailure', 'Could not delete the comment');
        dispatch('alert/error', 'Could not delete the comment', { root: true });
      }
    } catch (error) {
      commit('deleteCommentFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async likeCommnet({ dispatch, commit }, payload) {
    commit('likeCommentRequest');
    try {
      let data = await commentServices.likeComment(payload);
      if (data.type === 'success') {
        commit('likeCommentSuccess');
        dispatch('alert/success', data.message, { root: true });
      } else {
        commit('likeCommentFailure', 'Could not like the comment');
        dispatch('alert/error', 'Could not like the comment', { root: true });
      }
    } catch (error) {
      commit('likeCommentFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async dislikeCommnet({ dispatch, commit }, payload) {
    commit('dislikeCommentRequest');
    try {
      let data = await commentServices.dislikeComment(payload);
      if (data.type === 'success') {
        commit('dislikeCommentSuccess');
        dispatch('alert/success', data.message, { root: true });
      } else {
        commit('dislikeCommentFailure', 'Could not dislike the comment');
        dispatch('alert/error', 'Could not dislike the comment', { root: true });
      }
    } catch (error) {
      commit('dislikeCommentFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },
};

const mutations = {
  makeCommentRequest(state) {
    state.status = { commentingPost: true };
  },
  makeCommentSuccess(state, data) {
    state.status = { postCommented: true };
    state.comment.push(data);
    state.comments.push(data);

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
  getAllPostCommentsSuccess(state, data) {
    state.status = { gotPostComments: true };
    state.comments = data;

    state.error = null;
  },
  getAllPostCommentsFailure(state, error) {
    state.error = error;
    state.comment = null;
    state.status = { CommentFailed: true };
  },
  likeCommentRequest(state) {
    state.status = { likingComment: true };
  },
  likeCommentSuccess(state) {
    state.status = { commentLiked: true };
  },
  likeCommentFailure(state, error) {
    state.error = error;
    state.comment = null;
    state.status = { likeCommentFailed: true };
  },
  dislikeCommentRequest(state) {
    state.status = { dislikingComment: true };
  },
  dislikeCommentSuccess(state) {
    state.status = { commentDisliked: true };
  },
  dislikeCommentFailure(state, error) {
    state.error = error;
    state.comment = null;
    state.status = { dislikeCommentFailed: true };
  },
};

export const comments = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
