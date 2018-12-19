<template>
  <v-app>
    <v-toolbar color="secondary" app>
      <router-link to="/">
        <v-toolbar-side-icon>
          <v-img
            :src="require('./assets/logo.png')"
            contain
            height="36"
            width="42"
          ></v-img>
        </v-toolbar-side-icon>
      </router-link>

      <v-spacer></v-spacer>

      <router-link to="/">
        <v-tooltip bottom>
          <v-btn icon slot="activator">
            <v-icon>home</v-icon>
          </v-btn>
          Hjem
        </v-tooltip>
      </router-link>

      <router-link to="/help">
        <v-tooltip bottom>
          <v-btn icon slot="activator">
            <v-icon>help</v-icon>
          </v-btn>
          Hjelp
        </v-tooltip>
      </router-link>

        <v-menu offset-y full-width>
          <v-btn icon v-if="$adal.isAuthenticated()" slot="activator">
            <v-icon color="accent">verified_user</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile>
              <span v-on:click="$adal.logout()">
                Logg ut
              </span>
            </v-list-tile>
          </v-list>
        </v-menu>

    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    name: ''
  }),
  created () {
    if (this.$adal.isAuthenticated()) {
      console.log(this.$adal)
      this.name = this.$adal.user.profile.name
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
