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

  async deletePost({ dispatch, commit }, postID) {
    commit('deletePostRequest', postID);
    try {
      const postDelete = await postServices.deletePost(postID);
      if (postDelete.success) {
        commit('deletePostSuccess');
        dispatch('alert/success', `${postDelete.message}`, { root: true });
        window.location.reload();
      } else {
        commit('deletePostFailure', `${postDelete.message}`);
        dispatch('alert/error', 'error', { root: true });
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

  async getLikedPost({ dispatch, commit }, id) {
    commit('getLikedPostRequest');
    try {
      const likedPost = await postServices.getLikedPost(id);
      if (likedPost.success) {
        commit('getLikedPostSuccess', likedPost);
      } else {
        const message = 'No liked Post';
        commit('getLikedPostEmpty', message);
      }
    } catch (error) {
      commit('getLikedPostFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async getHashtagPost({ dispatch, commit }, payload) {
    commit('getHashtagPostRequest');
    try {
      const hashtagPosts = await postServices.getHashtagPost(payload);
      if (hashtagPosts.success) {
        commit('getHashtagPostSuccess', hashtagPosts.posts);
      } else {
        const message = 'No post with that hashtag';
        commit('getHashtagPostEmpty', message);
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
      if (data.success) {
        commit('disLikePostSuccess');
        dispatch('alert/success', 'Post disLiked successfully.', { root: true });
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
      const postDiscovered = await postServices.getDiscoverPost(limit);

      if (!postDiscovered) {
        const message = 'Your Timeline is empty.';
        commit('postDiscoveredEmpty', message);
        return;
      }
      if (postDiscovered.success) {
        commit('postDiscoveredSuccess', postDiscovered.posts);
      } else {
        const message = 'Your Home Timeline is empty.';
        commit('postDiscoveredEmpty', message);
      }
    } catch (error) {
      commit('postDiscoveredFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async getPostFeed({ dispatch, commit }, paylaod) {
    commit('postFeedRequest');
    try {
      let postFeed = {};
      if (paylaod.userName && paylaod.limit) {
        postFeed = await postServices.getPostFeed(paylaod.timeline, paylaod.userName, paylaod.limit);
      } else if (paylaod.userName) {
        postFeed = await postServices.getPostFeed(paylaod.timeline, paylaod.userName);
      } else {
        postFeed = await postServices.getPostFeed(paylaod.timeline);
      }

      if (!postFeed) {
        const message = 'Your Timeline is empty.';
        commit('postFeedEmpty', message);
        return;
      }
      if (postFeed.success) {
        commit('postFeedSuccess', postFeed.timeline);
      } else {
        const message = 'Your Home Timeline is empty.';
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
  },
  deletePostRequest(state, post) {
    state.status = { deletingPost: true };
    state.post = post;
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
  postFeedSuccess(state, timeline) {
    state.timeline = timeline;
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
  getHashtagPostSuccess(state, hashtagPosts) {
    state.status = { isLoaded: true };
    state.HashtagPost = hashtagPosts;
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
  postDiscoveredSuccess(state, posts) {
    state.status = { isLoaded: true };
    state.postDiscovered = posts;
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
