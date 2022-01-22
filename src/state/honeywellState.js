import Vue from "vue";
export const hw = Vue.observable({
    hwTimeLineShown: false,
    hwDetailsShown: false
});

export const hwToggle = {
  toggleHwDetails(){
    hw.hwDetailsShown = !hw.hwDetailsShown
  },
  toggleHwTimeLine(){
    hw.hwTimeLineShown = !hw.hwTimeLineShown
  }
};
