import Vue from "vue";

// save our state (isPanel open or not)
export const chatPanelOpen = Vue.observable({
    isChatOpen: false
});

// We call toggleNav anywhere we need it in our app
export const toggle = {
    toggleChat() {
      chatPanelOpen.isChatOpen = !chatPanelOpen.isChatOpen
    },
    offChat(){
      chatPanelOpen.isChatOpen = false
    }
};
