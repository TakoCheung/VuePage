<template>
  <v-container>
    <v-row dense>
        <v-col cols="12">
          <FarragutWorkExpCard/>
        </v-col>
        <v-col cols="12">
          <CstWorkExpCard/>
        </v-col>
        <v-col cols="12">
          <HoneywellExpCard/>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HoneywellExpCard from './HoneywellExpCard'
import CstWorkExpCard from './CstWorkExpCard'
import FarragutWorkExpCard from './FarragutWorkExpCard'
export default {
  name: 'WorkExp',
  components: {
    HoneywellExpCard,
    CstWorkExpCard,
    FarragutWorkExpCard
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
