<template>
  <div>
    <FarragutWorkExpCard/>
    <CstWorkExpCard/>
    <HoneywellExpCard/>
  </div>
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
