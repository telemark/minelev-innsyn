<template>
  <v-container>
    <v-layout wrap>
      <v-container fluid grid-list-lg>
        <v-layout wrap>
          <v-flex xs12>
           <v-breadcrumbs divider=">">
              <v-breadcrumbs-item href="/help">Hjelp</v-breadcrumbs-item>
            </v-breadcrumbs>
            <v-card>
              <v-card-title primary-title>
                <h3 class="headline">Spørsmål og svar</h3>
              </v-card-title>
              <v-card-text>
                <p>Nedenfor finner du ofte stilte spørsmål, svar og hurtigtaster.</p>
                <p>Feil, mangler og ønsker kan du sende til <a href="mailto:post.opplaring@t-fk.no" title="Send e-post til post.opplaring@t-fk.no" target="_blank">post.opplaring@t-fk.no</a></p>
                <h5 class="title">Hurtigtaster</h5>
                <br />
                <p><strong>Dokumentvisning</strong></p>
                <p><code>+</code>Zoom inn</p>
                <p><code>-</code>Zoom ut</p>
                <p><code>0</code>Tilbakestill zoom</p>
                <p><code>→</code>Neste side</p>
                <p><code>←</code>Forrige side</p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>
<style scoped>
code {
  margin-right: 15px;
}
</style>
