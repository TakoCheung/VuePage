<template>
  <div>
    <HoneywellExpCard/>
    <CstWorkExpCard/>
  </div>
</template>

<script>
import HoneywellExpCard from './HoneywellExpCard'
import CstWorkExpCard from './CstWorkExpCard'
export default {
  name: 'WorkExp',
  components: {
    HoneywellExpCard,
    CstWorkExpCard
  }
}
</script>
