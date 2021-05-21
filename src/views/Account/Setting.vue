<template>
  <div class="Setting py-10 container--fluid">
    <slot name="alert"></slot>
    <div class="Setting_Header mb-10">
      <AvatarLink
        class="Avatar mr-5"
        v-if="account.user.avatar"
        name_path="profil"
        :user_name="account.user.userName"
        :size="50"
        :avatar_uri="account.user.avatar.substring(62)"
      ></AvatarLink>
      <div class="Tab_Info">
        <div class="User">
          <h4 class="User_Name mr-2">{{ account.user.userName | capitalize }}</h4>
          <span>/</span>
          <h4 class="Tab_Name ml-2">{{ CurrentRouteName }}</h4>
        </div>
        <p class="Tab_Description">{{ CurrentRouteDescription }}</p>
      </div>
    </div>
    <div class="Setting_Tab">
      <div class="Setting_Tab_Big hidden-xs-only">
        <ul class="Tab_List">
          <li class="Tab_List_Name">
            <router-link class="Link" :to="{ name: 'Profile' }"> Edit Profil </router-link>
          </li>
          <li class="Tab_List_Name">
            <router-link class="Link" :to="{ name: 'General' }"> Account Settings </router-link>
          </li>
          <li class="Tab_List_Name">
            <router-link class="Link" :to="{ name: 'Password' }"> Passwords </router-link>
          </li>
          <li class="Tab_List_Name">
            <router-link class="Link" :to="{ name: 'Social Profile' }"> Social Profiles </router-link>
          </li>
          <li class="Tab_List_Name">
            <router-link class="Link" :to="{ name: 'Notification' }"> Notifications </router-link>
          </li>
        </ul>
      </div>
      <div class="Setting_Tab_Small hidden-sm-and-up">
        <v-select
          class="Select_Field"
          v-model="select"
          :items="tabs"
          item-text="tab"
          @change="changeRoute"
          dense
          offsetY
          hide-details
          hide-selected
          single-line
        ></v-select>
      </div>
      <div class="Setting_Current_Tab"><router-view class="Current_Tab"></router-view></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AvatarLink from '@/components/Bases/AvatarLink';
export default {
  data: () => {
    return {
      select: { tab: 'Profile', src: '/profile' },
      tabs: [
        { tab: 'Profile', src: '/profile' },
        { tab: 'General', src: '/general' },
        { tab: 'Password', src: '/password' },
        { tab: 'Social Profile', src: '/social_profile' },
        { tab: 'Notification', src: '/notification' },
      ],
    };
  },
  components: { AvatarLink },
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
    CurrentRouteName() {
      return this.$route.name;
    },
    CurrentRouteDescription() {
      let routeDescription = String;
      switch (this.$route.name) {
        case 'Profile':
          routeDescription = 'Set up your Glance presence and hiring needs';
          break;
        case 'General':
          routeDescription = 'Update your username and manage your account';
          break;
        case 'Password':
          routeDescription = 'Manage your password';
          break;
        case 'Social Profile':
          routeDescription = 'Add elsewhere links to your profile';
          break;
        case 'Notification':
          routeDescription = 'Get notified of activity at Glance';
          break;

        default:
          routeDescription = 'Set up your Glance presence and hiring needs';
      }
      return routeDescription;
    },
  },

  methods: {
    changeRoute(a) {
      this.$router.push({ name: a });
    },
  },
};
</script>

<style lang="scss" scoped>
.Setting {
  margin-left: 200px;
  margin-right: 200px;
  .Setting_Header {
    width: 800px;
    max-height: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .Tab_Info {
      .User {
        display: flex;
        justify-content: flex-start;
        letter-spacing: 0.08em;
        .User_Name {
          color: $color_primary;
        }
      }
      .Tab_Description {
        margin: 0;
        font-size: 0.85em;
      }
    }
  }
  .Setting_Tab {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    .Setting_Tab_Big {
      width: 180px;
      height: 200px;
      margin-right: 50px;
      .Tab_List {
        line-height: 30px;
        list-style: none;

        padding: 0;
        .Tab_List_Name {
          font-size: 0.85em;
          .Link {
            color: $font-color_fade;
            text-decoration: none;
            &:hover {
              cursor: pointer;
              color: $color_primary;
            }
          }
          .router-link-exact-active {
            color: $color_primary;
            font-size: 1.1em;
            font-weight: 700;
          }
        }
      }
    }
  }
  .Setting_Current_Tab {
    width: clamp(50%, 60%, 70%);
  }
}
@media screen and (max-width: 959px) {
  .Setting {
    margin: 10vw;
    width: 80vw;
  }
}
@media screen and (max-width: 599px) {
  .Setting {
    margin: 5vw;
    width: 95vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .Setting_Header {
    justify-content: center !important;
    align-items: center;
  }
  .Setting_Tab {
    margin: 5vw;
    width: 95vw;
    flex-direction: column;
    align-items: center !important;
    .Setting_Tab_Small {
      .Select_Field {
        margin: 5vw;
        margin-bottom: 10vh;
        width: 80vw;
        padding: 0.2em 0.4em;
        font-size: 1em;
        font-weight: 400;
        border: 1px solid $color_primary;
        border-radius: $border_radius/2;
        box-shadow: 0px 0px 10px $color_primary;
      }
    }
  }
}
</style>
