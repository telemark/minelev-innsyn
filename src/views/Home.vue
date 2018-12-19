<template>
  <v-container>
    <v-layout wrap>
      <v-container fluid grid-list-lg>
        <v-layout wrap>

          <v-flex>
            <v-card>
              <v-card-title primary-title>
                <h3 class="headline">Mine elever</h3>
              </v-card-title>
              <v-card-text class="grey--text">
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Søk etter elev"
                  single-line
                  hide-details
                ></v-text-field>
                <v-data-table
                  must-sort
                  hide-actions
                  :headers="computedHeaders"
                  :items="students"
                  :search="search"
                  :loading="loading"
                  :pagination.sync="pagination"
                >
                  <template slot="items" slot-scope="props">
                    <router-link tag="tr" :to="{ name: 'view', params: { id: props.item.userName }}">
                      <td class="text-xs">{{ props.item.fullName }}</td>
                      <td class="text-xs hidden-md-and-down">{{ props.item.mail }}</td>
                      <td class="text-xs hidden-md-and-down">{{ props.item.mobilePhone }}</td>
                      <td class="text-xs hidden-md-and-down">{{ props.item.mainGroupName }}</td>
                    </router-link>
                  </template>
                  <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Ditt søk etter "{{ search }}" fikk ingen resultater.
                  </v-alert>
                </v-data-table>
                <div class="text-xs-center pt-2">
                  <v-pagination v-model="pagination.page" color="accent" :length="pages"></v-pagination>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-snackbar v-model="snackbar.active" :color="snackbar.type === 'error' ? 'error' : 'primary'" :bottom="true">
            {{snackbar.message}}
          </v-snackbar>
          </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
const headers = [
  {
    text: 'Navn',
    sortable: true,
    value: 'fullName'
  },
  {
    text: 'E-post',
    sortable: false,
    value: 'mail',
    hide: 'mdAndDown'
  },
  {
    text: 'tlf.',
    sortable: false,
    value: 'mobilePhone',
    hide: 'mdAndDown'
  },
  {
    text: 'Klasse',
    sortable: false,
    value: 'mainGroupName',
    hide: 'mdAndDown'
  }
]

export default {
  data: () => ({
    snackbar: {
      active: false,
      message: false,
      type: false
    },
    pagination: {
      rowsPerPage: 5
    },
    loading: true,
    search: '',
    headers: [],
    students: []
  }),
  methods: {
    notification (msg, type = 'info') {
      this.snackbar.message = msg
      this.snackbar.type = type
      this.snackbar.active = true
    }
  },
  async created () {
    try {
      const { data } = await this.$http.get('https://elevmappa.minelev.win/api/students')
      this.students = data
      this.headers = headers
      this.loading = false
      this.pagination.totalItems = data.length
    } catch (error) {
      this.notification(error.message, 'error')
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    computedHeaders () {
      return this.headers.filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide])
    }
  }
}
</script>

<style>
.v-card__text {
  font-size: 18px;
}
</style>
