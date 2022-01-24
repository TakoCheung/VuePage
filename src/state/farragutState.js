import Vue from "vue";
export const fs = Vue.observable({
    fsTimeLineShown: false,
    fsDetailsShown: false
});

export const fsToggle = {
  toggleFsDetails(){
    fs.fsDetailsShown = !fs.fsDetailsShown
  },
  toggleFsTimeLine(){
    fs.fsTimeLineShown = !fs.fsTimeLineShown
  }
};
