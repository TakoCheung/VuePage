<template>
<v-card :style="{height : getDetailsShown ? 370+'px':getTimeLineShown ? 256+'px':164+'px', marginBottom:8+'px'}" class="mx-auto" max-width="344">
  <v-list-item three-line>
    <v-list-item-content>
      <div class="text-overline mb-4">
        <span style="color:#ef4b24">CentralSquare Techolgies</span>
      </div>
      <v-list-item-title class="text-h5 mb-1">
        Software Developer III
      </v-list-item-title>
      <v-list-item-subtitle>
        • Implemented a secured web API using HttpListener(https://docs.microsoft.com/en-us/dotnet/framework/network-programming/httplistener) with JWT authorization.
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-avatar tile size="80"><img src="../assets/cst.jpeg"></v-list-item-avatar>
  </v-list-item>
  <CardFooter id="cst"/>

  <v-expand-transition>
    <v-card v-if="getTimeLineShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
      <GChart :settings="{ packages: ['timeline']}" type="Timeline" :data="cstChartData" :options="cstChartOptions" />
      <CardFooter id="cst"/>
    </v-card>
  </v-expand-transition>
  <v-expand-transition>
    <v-card v-if="getDetailsShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
      <v-card-text class="pb-0">• Implemented a secured web API using HttpListener(https://docs.microsoft.com/en-us/dotnet/framework/network-programming/httplistener) with JWT authorization.
<p>• Designed and implemented an event-driven software which will send a request to the middle-tier server with JWT authentication, and fetch the data back to the client.</p>
<p>• Transformed an XML file to another XML file with the different formats by using XSLT and XPath.</p>
<p>• Implemented a Field Change Extension which allows the developer to configure it by a single JSON file.</p>
      </v-card-text>
      <CardFooter id="cst"/>
    </v-card>
  </v-expand-transition>
</v-card>
</template>

<script>
import CardFooter from './CardFooter'
import { cst } from '@/state/cstState.js'
export default {
  name: 'CstWorkExpCard',
  components: {
    CardFooter,
  },
  data: () => ({
    chartsLib: null,
    cstChartData: [
      ['Organization', 'Start', 'End'],
      ['CentralSquare Technolgies', new Date(2018, 4, 30), new Date(2020, 12, 2)]
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
        colors: ['#ef4b24']
      })
    },
    getDetailsShown() {
      return cst.cstDetailsShown
    },
    getTimeLineShown() {
      return cst.cstTimeLineShown
    }
  }
}
</script>
