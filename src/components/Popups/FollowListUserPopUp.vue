<template>
  <div>
    <v-dialog
      v-if="activefollower"
      max-height="50vh"
      max-width="580px"
      v-click-outside="onClickOutside"
      v-model="dialog"
    >
      <v-card class="pa-5" style="overflow: hidden; overflow-y: auto">
        <div v-for="follower in users.follower" :key="follower._id">
          <UserSingle :user="follower" class="py-3"></UserSingle>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-if="activefollowed"
      max-height="50vh"
      max-width="580px"
      v-click-outside="onClickOutside"
      v-model="dialog"
    >
      <v-card
        class="pa-5"
        v-for="following in users.following"
        :key="following._id"
        style="overflow: hidden; overflow-y: auto"
      >
        <UserSingle :user="following" class="py-3"></UserSingle>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UserSingle from '../UserSingle';
export default {
  props: {
    userid: {
      type: String,
      required: true,
    },
    activefollower: { type: Boolean },
    activefollowed: { type: Boolean },
  },
  data: () => ({ dialog: true }),
  components: { UserSingle },
  computed: {
    ...mapState({
      account: (state) => state.account,
      users: (state) => state.users,
    }),
  },
  methods: {
    ...mapActions(['users/getAllFollower', 'users/getAllFollowing']),
    onClickOutside() {
      this.dialog = false;
      this.$emit('update:closedialog', false);
    },
  },
  created() {
    if (this.activefollower) {
      this['users/getAllFollower'](this.userid);
    } else {
      this['users/getAllFollowing'](this.userid);
    }
  },
};
</script>
