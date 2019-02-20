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

        <v-menu offset-x full-width>
          <v-btn icon v-if="$adal.isAuthenticated()" slot="activator">
            <v-badge class="small-badge" top color="accent" overlap>
              <!-- <v-icon slot="badge">done</v-icon> -->
              <v-icon>person</v-icon>
             </v-badge>
          </v-btn>
          <v-card>
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <v-icon large>account_circle</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ username }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-tile v-on:click="$adal.logout()">
                <v-icon color="grey">power_settings_new</v-icon>&nbsp; Logg ut
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>

    </v-toolbar>

    <v-content>
      <router-view :accessToken="accessToken"/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    name: '',
    accessToken: '',
    token: ''
  }),
  created () {
    if (this.$adal.isAuthenticated()) {
      // console.log(this.$adal)
      const { clientId } = this.$adal.config
      const accessToken = localStorage.getItem(`adal.access.token.key${clientId}`)
      this.accessToken = { headers: { Authorization: `Bearer ${accessToken}` } }
      this.name = this.$adal.user.profile.name
      this.username = this.$adal.user.userName
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>

<style>
.small-badge .v-badge__badge {
  height: 12px;
  width: 12px;
  padding: 8px;
}
</style>
