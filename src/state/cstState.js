import Vue from "vue";
export const cstToggle = {
  toggleCstDetails(){
    cst.cstDetailsShown = !cst.cstDetailsShown
  },
  toggleCstTimeLine(){
    cst.cstTimeLineShown = !cst.cstTimeLineShown
  }
}

export const cst = Vue.observable({
    cstTimeLineShown: false,
    cstDetailsShown: false
});
