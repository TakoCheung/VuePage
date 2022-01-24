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
  import { fs, fsToggle } from '@/state/farragutState.js'
  export default {
    name: 'CardFooter',
    props: {id:String},
    methods:{
      clickTimeLine(){
        if(this.detailsShown()){
          this.clickDetails();
        }
        if(this.id === "hw") {
          hwToggle.toggleHwTimeLine()
        }
        else if(this.id === "cst") {
          cstToggle.toggleCstTimeLine()
        }
        else if(this.id === "fs") {
          fsToggle.toggleFsTimeLine()
        }
      },
      clickDetails(){
        if(this.timeLineShown()){
          this.clickTimeLine();
        }
        if(this.id === "hw") {
          hwToggle.toggleHwDetails()
        }
        else if(this.id === "cst") {
          cstToggle.toggleCstDetails()
        }
        else if(this.id === "fs") {
          fsToggle.toggleFsDetails()
        }
      },
      timeLineShown(){
        if(this.id === "hw") {
          return hw.hwTimeLineShown
        }
        else if(this.id === "cst") {
          return cst.cstTimeLineShown
        }
        else if(this.id === "fs") {
          return fs.fsTimeLineShown
        }
      },
      detailsShown(){
        if(this.id === "hw") {
          return hw.hwDetailsShown
        }
        else if(this.id === "cst") {
          return cst.cstDetailsShown
        }
        else if(this.id === "fs") {
          return fs.fsDetailsShown
        }
      }
    }
  }
</script>
