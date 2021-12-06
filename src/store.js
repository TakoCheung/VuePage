import Vue from "vue";

// save our state (isPanel open or not)
export const store = Vue.observable({
    isNavOpen: false,
    hwTimeLineShown: false,
    hwDetailsShown: false
});

// We call toggleNav anywhere we need it in our app
export const mutations = {
    toggleNav() {
      store.isNavOpen = !store.isNavOpen
    },
    toggleHwDetails(){
      store.hwDetailsShown = !store.hwDetailsShown
      store.hwTimeLineShown = false
    },
    toggleHwTimeLine(){
      store.hwTimeLineShown = !store.hwTimeLineShown
      store.hwDetailsShown = false
    }
};
