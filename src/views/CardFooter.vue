<template>
  <v-card-actions>
    <v-btn rounded text @click="clickTimeLine">
      {{timeLineShown() ? 'Hide' : 'Show'}} Time Line
    </v-btn>
    <v-btn rounded text @click="clickDetails">
      {{detailsShown() ? 'Hide' : 'Show'}} Details
    </v-btn>
  </v-card-actions>
</template>

<script>
  import { hw, hwToggle } from '@/state/honeywellState.js'
  import { cst, cstToggle } from '@/state/cstState.js'
  export default {
    name: 'CardFooter',
    props: {id:String},
    methods:{
      clickTimeLine(){
        if(this.id === "hw") {
          hwToggle.toggleHwTimeLine()
        }
        else if(this.id === "cst") {
          cstToggle.toggleCstTimeLine()
        }
      },
      clickDetails(){
        if(this.id === "hw") {
          hwToggle.toggleHwDetails()
        }
        else if(this.id === "cst") {
          cstToggle.toggleCstDetails()
        }
      },
      timeLineShown(){
        if(this.id === "hw") {
          // console.log(this.id + ':' + hw.hwTimeLineShown)
          return hw.hwTimeLineShown
        }
        else if(this.id === "cst") {
          // console.log(this.id + ':' + hw.hwTimeLineShown)
          return cst.cstTimeLineShown
        }
      },
      detailsShown(){
        if(this.id === "hw") {
          return hw.hwDetailsShown
        }
        else if(this.id === "cst") {
          return cst.cstDetailsShown
        }
      }
    }
  }
</script>
