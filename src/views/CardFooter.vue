<template>
  <v-card-actions>
    <v-btn rounded text @click="click">
      {{getTimeLineShown() ? 'Hide' : 'Show'}} Time Line
    </v-btn>
    <v-btn rounded text @click="click">
      {{getDetailsShown() ? 'Hide' : 'Show'}} Details
    </v-btn>
  </v-card-actions>
</template>

<script>
  import { store } from '../store.js'
  export default {
    name: 'CardFooter',
    methods:{
      click(){
        this.$emit("btnClick")
      },
      getDetailsShown(){
        return store.detailsShown
      },
      getTimeLineShown(){
        return store.timeLineShown
      }
    }
  }
</script>
