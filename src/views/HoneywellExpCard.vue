<template>
<v-card :style="{height : getDetailsShown ? 568+'px':getTimeLineShown ? 256+'px':164+'px', marginBottom:8+'px'}" class="mb-3" max-width="344">
  <v-list-item three-line>
    <v-list-item-content>
      <div class="text-overline mb-4">
        <span style="color:#ef3124">Honeywell</span>
      </div>
      <v-list-item-title class="text-h5 mb-1">
        Software Developer (CO-OP)
      </v-list-item-title>
      <v-list-item-subtitle>
        Requirement Analysis:
        <p>• HTTPS became a requirement when we were designing the User Management Web App.</p>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-avatar tile size="80"><img src="../assets/hw.jpeg"></v-list-item-avatar>
  </v-list-item>
  <CardFooter id="hw"/>

  <v-expand-transition>
    <v-card v-if="getTimeLineShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
      <GChart :settings="{ packages: ['timeline']}" type="Timeline" :data="honeywellChartData" :options="honeywellChartOptions" />
      <CardFooter id="hw"/>
    </v-card>
  </v-expand-transition>
  <v-expand-transition>
    <v-card v-if="getDetailsShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
      <v-card-text class="pb-0">Requirement Analysis:
        <p>• HTTPS became a requirement when we were designing the User Management Web App.</p>
        <p>Design:</p>
        <p>• Eliminated the possibility of OS injection and improved the performance by using Ajax to upload the file, parsing the file into binary without saving the file on the server.</p>
        <p>• Cleaner and easier to maintain by following MVC for both frontend and backend</p>
        <p>Implementation:</p>
        <p>• Saved company about $100,000 by Implementing a single step firmware upgrade.</p>
        <p>Testing:</p>
        <p>• Speeded up the building process by 20% after Postman became the tool of integration testing.</p>
        <p>Maintenance:</p>
        <p>• Prevented introducing new implementation bug by integrating Fortify SCA scanning process into Gradle and the Gradle script into the Jenkins pipeline.</p>
        <p>• Reduced the deployment time by 50% by modifying the existing batch script.</p>
      </v-card-text>
      <CardFooter id="hw"/>
    </v-card>
  </v-expand-transition>
</v-card>
</template>

<script>
import CardFooter from './CardFooter'
import { hw } from '@/state/honeywellState.js'
export default {
  name: 'HoneywellExpCard',
  components: {
    CardFooter,
  },
  data: () => ({
    chartsLib: null,
    honeywellChartData: [
      ['Organization', 'Start', 'End'],
      ['Honeywell', new Date(2016, 12, 14), new Date(2018, 4, 14)]
    ],
  }),
  methods: {
    onChartReady(chart, google) {
      this.chartsLib = google
    }
  },
  computed: {
    honeywellChartOptions() {
      return ({
        colors: ['#ef3124']
      })
    },
    getDetailsShown() {
      return hw.hwDetailsShown
    },
    getTimeLineShown() {
      return hw.hwTimeLineShown
    }
  }
}
</script>
