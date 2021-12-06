<template>
  <div class="home">
    <img alt="self" src="../assets/self.jpg">
    <BasicInfo msg="Kwan Ho Tako Cheung"/>
  </div>
</template>

<script>
// @ is an alias to /src
import BasicInfo from './BasicInfo.vue'

export default {
  name: 'Basic',
  components: {
    BasicInfo
  }
}
</script>
