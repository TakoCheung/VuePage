import Vue from "vue";

// save our state (isPanel open or not)
export const store = Vue.observable({
    isNavOpen: false,
    timeLineShown: false,
    detailsShown: false
});

// We call toggleNav anywhere we need it in our app
export const mutations = {
    toggleNav() {
      store.isNavOpen = !store.isNavOpen
    },
    toggleDetails(){
      store.detailsShown = !store.detailsShown
      store.timeLineShown = false
    },
    toggleTimeLine(){
      store.timeLineShown = !store.timeLineShown
      store.detailsShown = false
    }
};
