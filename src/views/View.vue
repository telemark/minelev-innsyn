<template>
  <v-container>
    <v-layout wrap>
      <v-container fluid grid-list-lg>
        <v-layout wrap>

          <v-flex>
            <v-card>
              <v-card-title primary-title>
                <h3 class="headline">{{ student.fullName }}</h3>
              </v-card-title>
              <v-card-text class="grey--text">
                Fødselsnummer: {{ student.personalIdNumber }}<br/>
                Mobilnr: {{ student.mobilePhone }} <br/>
                E-post: {{ student.mail }} <br/>
                Adresse: -<br/>
                Klasse: {{ student.mainGroupName }}<br/><br/>
               <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Søk i dokumenter"
                  single-line
                  hide-details
                ></v-text-field>
                <v-data-table
                  must-sort
                  hide-actions
                  :headers="headers"
                  :items="student.documents"
                  :search="search"
                  :loading="loading"
                  :pagination.sync="pagination"
                >
                  <template slot="items" slot-scope="props">
                    <tr @click="props.expanded = !props.expanded">
                      <td class="text-xs">{{ props.item.id }}</td>
                      <td class="text-xs">{{ props.item.title }}</td>
                    </tr>
                  </template>
                  <template slot="expand" slot-scope="props">
                    <v-card flat>
                      <v-card-text :key="item.file" v-for="item in props.item.files">
                        <b>Fra</b>: {{ item.from }}<br/>
                        <b>Til</b>: {{ item.to }}<br/>
                        <v-divider></v-divider>
                        <span @click="showDialog(item.file)">
                          <v-icon>attachment</v-icon> {{ item.title }}
                        </span>
                      </v-card-text>
                    </v-card>
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
            <v-dialog
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <v-card>
                <v-toolbar fixed color="secondary">
                  <v-btn @click="dialog = false" icon flat dark color="primary">
                    <v-icon dark>close</v-icon>
                  </v-btn>
                  <v-toolbar-title color="primary">
                    Dokumentvisning
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  Side:
                  <input v-model.number="page" type="number" style="width: 2em"> / {{ pageCount }}
                </v-toolbar>
                <v-card-text v-if="pdfFile.length > 1">
                  <pdf
                    :src="'data:application/pdf;base64,' + pdfFile"
                    :page="page"
                    @num-pages="pageCount = $event"
                    @page-loaded="currentPage = $event"
                    @link-clicked="page = $event"
                    @error="e => notification(e, 'error')"
                  ></pdf>
                </v-card-text>
              </v-card>
            </v-dialog>
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
import pdf from 'vue-pdf'

export default {
  data: () => ({
    snackbar: {
      active: false,
      message: false,
      type: false
    },
    student: {},
    headers: [
      {
        text: 'Dok. nr.',
        sortable: true,
        value: 'id'
      },
      {
        text: 'Tittel',
        sortable: false,
        value: 'title'
      }
    ],
    loading: true,
    search: '',
    pagination: {
      rowsPerPage: 5
    },
    dialog: false,
    pdfFile: '',
    currentPage: 0,
    pageCount: 0,
    page: 1
  }),
  methods: {
    notification (msg, type = 'info') {
      this.snackbar.message = msg
      this.snackbar.type = type
      this.snackbar.active = true
    },
    async showDialog (fileId) {
      try {
        const { data: { file } } = await this.$http.get(`https://elevmappa.minelev.win/api/files/${fileId}`)
        this.pdfFile = file
        this.dialog = true
        this.page = 1
      } catch (error) {
        this.notification(error.message, 'error')
      }
    }
  },
  async created () {
    try {
      const { data } = await this.$http.get(`https://elevmappa.minelev.win/api/students/${this.$route.params.id}`)
      this.student = data
      this.loading = false
    } catch (error) {
      this.notification(error.message, 'error')
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  components: {
    pdf
  }
}
</script>

<style>
.v-card__text {
  font-size: 18px;
}
tr:hover {
  cursor: pointer;
}
</style>
