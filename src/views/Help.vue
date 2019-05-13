<template>
  <v-container>
    <v-layout wrap>
      <v-container fluid grid-list-lg>
        <v-layout wrap>
          <v-flex xs12>
            <v-card>
              <router-link to="/" tag="button">
                <v-btn
                  color="accent"
                  small
                >
                <v-icon>navigate_before</v-icon>
                Tilbake
                </v-btn>
              </router-link>
              <v-card-title primary-title>
                <h3 class="headline">Spørsmål og svar</h3>
              </v-card-title>
              <v-card-text>
                <p>Nedenfor finner du ofte stilte spørsmål, svar og hurtigtaster.</p>
                <p>Feil, mangler og ønsker kan du sende til <a href="mailto:post.opplaring@t-fk.no" title="Send e-post til post.opplaring@t-fk.no" target="_blank">post.opplaring@t-fk.no</a></p>
                <h5 class="title">Om Elevmappa</h5>
                <br />
                <p>Elevmappa gir deg mulighet til å søke opp elevene du er kontakt- og faglærer for.<br/>I elevmappene vil du finne dokumenter som tilhører eleven.</p>
                <p>På forsiden velger du en elev ved å trykke på navnet i listen.<br/>Når du har trykket på navnet til eleven får du se dokumentene du har leserettigheter til som lærer.</p>
                <h5 class="title">Spørsmål</h5>
                <br />
                <p><b>Jeg finner ikke eleven jeg leter etter.</b></p>
                <p>Finner du ikke eleven du leter etter, ta kontakt med den som er ansvarlig for Extens eller administrativt personale på din skole.</p>
                <p><b>Jeg mangler leserettigheter til et dokument jeg mener jeg bør lese.</b></p>
                <p>Ta kontakt med din nærmeste leder som vil undersøke om du har rett til innsyn i dokumentet.</p>
                <p><b>Jeg får melding om "Finner ikke elevmappe. Kontakt arkivet"</b></p>
                <p>Ta kontakt med arkivet på e-post: post.arkiv@t-fk.no eller tlf. 35 91 70 11</p>
                <h5 class="title">Hurtigtaster</h5>
                <br />
                <p><strong>Dokumentvisning</strong></p>
                <p><code>+</code>Zoom inn</p>
                <p><code>-</code>Zoom ut</p>
                <p><code>0</code>Tilbakestill zoom</p>
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
