<template>
<v-card :style="{height : getDetailsShown ? 570+'px':getTimeLineShown ? 256+'px':164+'px'}" class="mx-auto" max-width="344">
  <v-list-item three-line>
    <v-list-item-content>
      <div class="text-overline mb-4">
        <span style="color:orange">CentralSquare Techolgies</span>
      </div>
      <v-list-item-title class="text-h5 mb-1">
        Software Developer (CO-OP)
      </v-list-item-title>
      <v-list-item-subtitle>
        • Implemented a secured web API using HttpListener(https://docs.microsoft.com/en-us/dotnet/framework/network-programming/httplistener) with JWT authorization.
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-avatar tile size="80"><img src="../assets/hw.jpeg"></v-list-item-avatar>
  </v-list-item>
  <CardFooter />

  <v-expand-transition>
    <v-card v-if="getTimeLineShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
      <GChart :settings="{ packages: ['timeline']}" type="Timeline" :data="honeywellChartData" :options="honeywellChartOptions" />
      <CardFooter />
    </v-card>
  </v-expand-transition>
  <v-expand-transition>
    <v-card v-if="getDetailsShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
      <v-card-text class="pb-0">• Implemented a secured web API using HttpListener(https://docs.microsoft.com/en-us/dotnet/framework/network-programming/httplistener) with JWT authorization.
<p>• Designed and implemented an event-driven software which will send a request to the middle-tier server with JWT authentication, and fetch the data back to the client.</p>
<p>• Transformed an XML file to another XML file with the different formats by using XSLT and XPath.</p>
<p>• Implemented a Field Change Extension which allows the developer to configure it by a single JSON file.</p>
      </v-card-text>
      <CardFooter />
    </v-card>
  </v-expand-transition>
</v-card>
</template>

<script>
import CardFooter from './CardFooter'
import {
  store,
  mutations
} from '../store.js'
export default {
  name: 'HoneywellExpCard',
  components: {
    CardFooter,
  },
  data: () => ({
    chartsLib: null,
    honeywellChartData: [
      ['Organization', 'Start', 'End'],
      ['Honeywell', new Date(2016, 1, 14), new Date(2018, 5, 14)]
    ],
  }),
  methods: {
    btnClick(event) {
      if (event.target.localName !== 'span') {
        return
      }
      if (event.target.outerText.includes('DETAILS')) {
        mutations.toggleDetails()
      } else if (event.target.outerText.includes('TIME')) {
        mutations.toggleTimeLine()
      }
    },
    onChartReady(chart, google) {
      this.chartsLib = google
    }
  },
  computed: {
    honeywellChartOptions() {
      return ({
        colors: ['#d95f02']
      })
    },
    getDetailsShown() {
      return store.detailsShown
    },
    getTimeLineShown() {
      return store.timeLineShown
    }
  },
  mounted() {
    window.addEventListener("click", this.btnClick);
  }
}
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
