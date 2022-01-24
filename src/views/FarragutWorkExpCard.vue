<template>
<v-card :style="{height : getDetailsShown ? 282+'px':getTimeLineShown ? 256+'px':164+'px', marginBottom:8+'px'}" class="mx-auto" max-width="344">
  <v-list-item three-line>
    <v-list-item-content>
      <div class="text-overline mb-4">
        <span style="color:#d7332c">Farragut Systems</span>
      </div>
      <v-list-item-title class="text-h5 mb-1">
        Software Developer
      </v-list-item-title>
      <v-list-item-subtitle>
        • Integrated Jenkins with MS Team to enable real-time notification for better CI monitoring.
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-avatar tile size="80"><img src="../assets/farragut.jpeg"></v-list-item-avatar>
  </v-list-item>
  <CardFooter id="fs"/>

  <v-expand-transition>
    <v-card v-if="getTimeLineShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
      <GChart :settings="{ packages: ['timeline']}" type="Timeline" :data="cstChartData" :options="cstChartOptions" />
      <CardFooter id="fs"/>
    </v-card>
  </v-expand-transition>
  <v-expand-transition>
    <v-card v-if="getDetailsShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
      <v-card-text class="pb-0">• Integrated Jenkins with MS Team to enable real-time notification for better CI monitoring.
<p>• Converted an Angular component into React component.</p>
<p>• Made a Message Box component in React so that the Message Box is reusable within the App.</p>
<p>• Write the code in the cloud with Cloud9, CloudFormation, CloudWatch, Lambda, Step Function, S3, EC2 in AWS</p>
      </v-card-text>
      <CardFooter id="fs"/>
    </v-card>
  </v-expand-transition>
</v-card>
</template>

<script>
import CardFooter from './CardFooter'
import { fs } from '@/state/farragutState.js'
export default {
  name: 'FarragutWorkExpCard',
  components: {
    CardFooter,
  },
  data: () => ({
    chartsLib: null,
    cstChartData: [
      ['Organization', 'Start', 'End'],
      ['Farragut Systems', new Date(2020, 12, 4), Date.now()]
    ],
  }),
  methods: {
    onChartReady(chart, google) {
      this.chartsLib = google
    }
  },
  computed: {
    cstChartOptions() {
      return ({
        colors: ['#d7332c']
      })
    },
    getDetailsShown() {
      return fs.fsDetailsShown
    },
    getTimeLineShown() {
      return fs.fsTimeLineShown
    }
  }
}
</script>
