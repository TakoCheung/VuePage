<template>
  <v-card-actions>
    <v-btn rounded text @click="click">
      {{timeLineShown() ? 'Hide' : 'Show'}} Time Line
    </v-btn>
    <v-btn rounded text @click="click">
      {{detailsShown() ? 'Hide' : 'Show'}} Details
    </v-btn>
  </v-card-actions>
</template>

<script>
  import { hw } from '@/state/honeywellState.js'
  import { cst } from '@/state/cstState.js'
  export default {
    name: 'CardFooter',
    props: {id:String},
    methods:{
      click(){
        this.$emit("btnClick")
      },
      timeLineShown(){
        if(this.id === "hw") return hw.hwTimeLineShown
        else if(this.id === "cst") return cst.cstTimeLineShown
        return false
      },
      detailsShown(){
        if(this.id === "hw") return hw.hwDetailsShown
        else if(this.id === "cst") return cst.cstDetailsShown
        return false
      }
    }
  }
</script>
