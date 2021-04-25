<template>
  <div class="About_User">
    <div class="About">
      <h2>About Me</h2>
      <p>
        {{ users.user.about_user }}
      </p>
    </div>
    <div class="Info List">
      <h2 v-if="users.user.location || users.user.website">Info</h2>
      <ul v-if="users.user.location || users.user.website">
        <li>
          <img class="Icon ml-2" src="@/assets/Icons/location.svg" />
          <a :href="users.user.location" class="Label">Location</a>
        </li>
        <li>
          <img class="Icon ml-2" src="@/assets/Icons/website.svg" />
          <a :href="users.user.website" class="Label">Website</a>
        </li>
      </ul>
    </div>
    <div class="Socials List">
      <h2
        v-if="
          users.user.socials.twitter ||
          users.user.socials.facebook ||
          users.user.socials.instagram ||
          users.user.socials.github ||
          users.user.socials.linkedin ||
          users.user.socials.dribbble ||
          users.user.socials.behance
        "
      >
        Socials Media
      </h2>
      <ul
        v-if="
          users.user.socials.twitter ||
          users.user.socials.facebook ||
          users.user.socials.instagram ||
          users.user.socials.github ||
          users.user.socials.linkedin ||
          users.user.socials.dribbble ||
          users.user.socials.behance
        "
      >
        <li v-if="users.user.socials.twitter">
          <img class="Icon ml-2" src="@/assets/Icons/twitter.svg" />
          <a :href="users.user.socials.twitter" class="Label">Twitter</a>
        </li>
        <li v-if="users.user.socials.facebook">
          <img class="Icon ml-2" src="@/assets/Icons/facebook.svg" />
          <a :href="users.user.socials.facebook" class="Label">Facebook</a>
        </li>
        <li v-if="users.user.socials.instagram">
          <img class="Icon ml-2" src="@/assets/Icons/instagram.svg" />
          <a :href="users.user.socials.instagram" class="Label">Instagram</a>
        </li>
        <li v-if="users.user.socials.github">
          <img class="Icon ml-2" src="@/assets/Icons/github.svg" />
          <a :href="users.user.socials.github" class="Label">Github</a>
        </li>
        <li v-if="users.user.socials.linkedin">
          <img class="Icon ml-2" src="@/assets/Icons/linkedin.svg" />
          <a :href="users.user.socials.linkedin" class="Label">LinkedIn</a>
        </li>
        <li v-if="users.user.socials.dribbble">
          <img class="Icon ml-2" src="@/assets/Icons/dribbble.svg" />
          <a :href="users.user.socials.dribbble" class="Label">Dribbble</a>
        </li>
        <li v-if="users.user.socials.behance">
          <img class="Icon ml-2" src="@/assets/Icons/behance.svg" />
          <a :href="users.user.socials.behance" class="Label">Behance</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({}),
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
  },
};
</script>

<style lang="scss" scoped>
.About_User {
  max-width: 960px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-template-areas:
    'about about about . info'
    'about about about . info'
    'about about about . socials '
    'about about about . socials ';

  .About {
    grid-area: about;
  }
  .Info {
    grid-area: info;
  }
  .Socials {
    grid-area: socials;
  }
  .List {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    h2 {
      display: block;
    }
    ul {
      padding: 0;

      li {
        list-style-type: none;
        display: flex;
        align-items: center;
        a {
          text-decoration: none;
          color: black;
          &:hover {
            color: $color_primary;
          }
        }
      }
    }
    .Label {
      margin: 0.5em 0 0.5em 0;
    }
    .Icon {
      width: 2em;
      margin: 0.5em 0.5em 0.5em 0;
    }
  }
}
@media screen and (max-width: 960px) {
  .About_User {
    width: 70vw;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(100px, auto);
    grid-template-areas:
      'about '
      'info '
      'socials ';

    .List {
      align-items: flex-start;
      margin: 1vh 0;
    }
  }
}
</style>

