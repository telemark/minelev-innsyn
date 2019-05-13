<template>
  <v-container>
    <v-layout wrap>
      <v-container fluid grid-list-lg>
        <v-layout wrap>
          <v-flex>
            <v-breadcrumbs divider=">">
              <v-breadcrumbs-item href="/">Elever</v-breadcrumbs-item>
              <v-breadcrumbs-item :href="this.$route.params.id">{{ this.$route.params.id }}</v-breadcrumbs-item>
            </v-breadcrumbs>
            <v-card>
              <v-card-title primary-title>
                <h3 class="headline">{{ student.fullName }}</h3>
              </v-card-title>
              <v-card-text>
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
                  autofocus
                  color="accent"
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
                      <td class="text-xs">{{ unescapeString(props.item.id) }}</td>
                      <td class="text-xs">{{ props.item.title }}</td>
                    </tr>
                  </template>
                  <template slot="expand" slot-scope="props">
                    <v-card flat>
                      <v-card-text :key="item.file" v-for="item in props.item.files">
                        <b>Fra</b>: {{ item.from || 'Ukjent' }}<br/>
                        <b>Til</b>: {{ item.to || 'Ukjent' }}<br/>
                        <v-divider style="margin-bottom: 10px"></v-divider>
                        <span @click="showDialog(item.file)">
                          <v-progress-circular v-if="fileLoading === item.file" size="16" width="3" indeterminate color="accent" ></v-progress-circular>
                          <v-icon v-else style="height: 16px">attachment</v-icon> {{ item.title }}
                        </span>
                      </v-card-text>
                    </v-card>
                  </template>
                  <v-alert slot="no-data" :value="!loading" color="error" icon="warning">
                    {{ snackbar.message }}
                  </v-alert>
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
              @keydown.187='zoom += 20'
              @keydown.189='zoom -= 20'
              @keydown.48='zoom = 100'
              @keydown.left='prevPage'
              @keydown.right='nextPage'
            >
              <v-card>
                <v-toolbar fixed color="secondary">
                  <v-btn @click="dialog = false" icon flat dark color="primary">
                    <v-icon dark>close</v-icon>
                  </v-btn>
                  <v-toolbar-title color="primary">
                    <span class="hidden-md-and-down">Dokumentvisning - </span><i>{{ unescapeString(fileId) }}</i>
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items style="height: unset">
                    <div>
                      <span>
                        Side:
                        <input v-model.number="page" type="number" min="1" :max="pageCount" style="width: 2.3em; background: white; border: 1px solid;"> / {{ pageCount }}
                      </span>
                    </div>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text v-if="pdfFile.length > 1">
                  <div :style="'width:' + zoom + '%'" class="pdf-viewer-wrapper" :class='{"zoom-active": zoom > 100 }' v-dragscroll>
                    <pdf
                      :src="pdfFile"
                      :page="page"
                      :rotate="rotate"
                      @num-pages="pageCount = $event"
                      @page-loaded="currentPage = $event"
                      @link-clicked="page = $event"
                      @error="e => notification(e.length > 0 ? e : 'Ugyldig side', 'error')"
                    ></pdf>
                  </div>
                  <v-snackbar bottom right :timeout="0" value="true" class="transparent-snack">
                    <span>
                      <v-tooltip v-if="page !== 1" top>
                        <v-btn slot="activator" @click='page -= 1' style="padding: 0;" flat icon><v-icon>navigate_before</v-icon></v-btn>
                        Forrige side
                      </v-tooltip>
                      <v-tooltip v-if="page !== pageCount" top>
                        <v-btn slot="activator" @click='page += 1' style="padding: 0; margin-right: 10px;" flat icon><v-icon>navigate_next</v-icon></v-btn>
                        Neste side
                      </v-tooltip>
                      <v-tooltip top>
                        <v-btn slot="activator" @click='zoom += 20' style="padding: 0; margin-right: 10px;" flat icon><v-icon>zoom_in</v-icon></v-btn>
                        Zoom in
                      </v-tooltip>
                      <v-tooltip top>
                        <v-btn slot="activator" @click='zoom -= 20' style="padding: 0; margin-right: 10px" flat icon><v-icon>zoom_out</v-icon></v-btn>
                        Zoom ut
                      </v-tooltip>
                      <v-tooltip top>
                        <v-btn slot="activator" @click='rotate -= 90' style="display: none; padding: 0; margin-right: 10px" flat icon><v-icon>rotate_left</v-icon></v-btn>
                        Rotèr venstre
                      </v-tooltip>
                      <v-tooltip top>
                        <v-btn slot="activator" @click='rotate += 90' style="display: none; padding: 0; margin-right: 10px" flat icon><v-icon>rotate_right</v-icon></v-btn>
                        Rotèr høyre
                      </v-tooltip>
                    </span>
                  </v-snackbar>
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
import { dragscroll } from 'vue-dragscroll'
import config from '../../config'

export default {
  props: {
    accessToken: {
      type: Object,
      required: true
    }
  },
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
        value: 'sortId'
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
      rowsPerPage: 10,
      descending: true
    },
    dialog: false,
    pdfFile: '',
    fileId: '',
    currentPage: 0,
    pageCount: 0,
    page: 1,
    zoom: 100,
    rotate: 0,
    fileLoading: false
  }),
  methods: {
    notification (msg, type = 'info') {
      this.snackbar.message = msg
      this.snackbar.type = type
      this.snackbar.active = true
    },
    unescapeString (str) {
      return unescape(str)
    },
    nextPage () {
      if (this.page < this.pageCount) this.page += 1
    },
    prevPage () {
      if (this.page > 1) this.page -= 1
    },
    convertDataToBinary (base64) {
      return new Uint8Array(atob(base64).split('').map(c => c.charCodeAt(0)))
    },
    checkErrorCode (error) {
      if (error.response && error.response.status === 401) {
        console.log('401 status code logging out')
        this.$adal.logout()
      }
    },
    async showDialog (fileId) {
      try {
        this.fileLoading = fileId
        const { data: { file } } = await this.$http.get(`${config.studentsApiUrl}/api/files/${fileId}`, this.accessToken)
        // const { data: { file } } = await this.$http.get(`https://holy-glitter-6328.getsandbox.com/a`, this.accessToken)
        this.pdfFile = this.convertDataToBinary(file)
        this.fileLoading = false
        this.fileId = fileId
        this.dialog = true
        this.page = 1
        this.zoom = 100
        this.rotate = 0
      } catch (error) {
        this.fileLoading = false
        this.checkErrorCode(error)
        this.notification(error.message, 'error')
      }
    }
  },
  async created () {
    try {
      // const { data } = await this.$http.get(`https://my-students.innsyn.minelev.no/api/students/${this.$route.params.id}`, this.accessToken)
      const { data } = await this.$http.get(`${config.studentsApiUrl}/api/students/${this.$route.params.id}`, this.accessToken)
      this.student = data
      this.loading = false
      this.pagination.totalItems = data.documents.length
    } catch (error) {
      this.checkErrorCode(error)
      this.loading = false
      const message = error.response && error.response.data ? error.response.data : error.message
      this.notification(message, 'error')
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  components: { pdf },
  directives: { dragscroll }
}
</script>
<style>
.pdf-viewer-wrapper {
  margin-top: 64px;
  overflow: hidden;
  max-height: 90vh;
  cursor: grab;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: -o-grab;
}
.pdf-viewer-wrapper:active {
  cursor : -webkit-grabbing;
  cursor : -moz-grabbing;
  cursor : -o-grabbing;
  cursor : grabbing;
}
.transparent-snack {
  opacity: 0.5;
  padding: 0;
}
.transparent-snack .v-snack__wrapper {
  min-width: unset;
}
.transparent-snack .v-snack__content {
  padding: unset;
}
.transparent-snack .v-snack__content .v-btn:first-of-type {
  margin-left: 10px;
}
</style>
