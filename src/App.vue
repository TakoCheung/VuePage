<template>
<div id="app">
  <v-container>
    <nav class="main-nav">
      <VueScrollProgress />
      <Burger />

      <router-view />

      <Sidebar>
        <ul class="sidebar-panel-nav">
          <li @click="toggle">
            <router-link to="/about">About</router-link>
          </li>
          <li @click="toggle">
            <router-link to="/education">Education</router-link>
          </li>
          <li @click="toggle">
            <router-link to="/WorkExpriences">Work Expriences</router-link>
          </li>
        </ul>
      </Sidebar>
    </nav>
  </v-container>
  <ChatIcon />
  <ChatPanel />
</div>
</template>

<script>
import Burger from './components/Menu/Burger.vue';
import Sidebar from './components/Menu/Sidebar.vue';
import ChatIcon from './components/ChatIcon.vue';
import ChatPanel from './components/ChatPanel.vue';
import {
  store,
  mutations
} from '@/state/store.js';
export default {
  name: 'app',
  components: {
    Sidebar,
    Burger,
    ChatIcon,
    ChatPanel
  },
  computed: {
    isBurgerActive() {
      return store.isNavOpen
    }
  },
  methods: {
    toggle() {
      mutations.toggleNav()
    }
  }
}
</script>
<style>
html {
  height: 100%;
  overflow: auto;
}

body {
  border: 0;
  margin: 0;
  padding: 0;
  font-family: 'Lato';
  height: 100%;
  background: rgba(32, 77, 72, 50%)
    /*linear-gradient(45deg, rgba(101,31,87,1) 0%, rgba(225,113,87,5) 48%, rgba(249,248,113,1) 100%);*/
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.logo {
  align-self: center;
  color: #fff;
  font-weight: bold;
  font-family: 'Lato'
}

.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
}

ul.sidebar-panel-nav {
  list-style-type: none;
}

ul.sidebar-panel-nav>li>a {
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  display: block;
  padding-bottom: 0.5em;
}

li:hover,
li.router-link-active,
li.router-link-exact-active {
  background-color: #000000;
  text-decoration: underline;
}

/* play with some lines below */
#progress-container-el {
  /* background */
  background-color: transparent !important;
}

#progress-el {
  /* progress bar */
  background-color: #4285f4 !important;
}

.hidden {
  visibility: hidden;
}

button {
  cursor: pointer;
}

/* remove blue outline */
button:focus {
  outline: 0;
}

.burger-button {
  position: relative;
  height: 30px;
  width: 32px;
  display: block;
  z-index: 9;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  pointer-events: all;
  transition: transform .6s cubic-bezier(.165, .84, .44, 1);
}

.burger-bar {
  background-color: #130f40;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 2px;
  width: auto;
  margin-top: -1px;
  transition: transform .6s cubic-bezier(.165, .84, .44, 1), opacity .3s cubic-bezier(.165, .84, .44, 1), background-color .6s cubic-bezier(.165, .84, .44, 1);
}

.burger-bar--1 {
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
}

.burger-bar--2 {
  transform-origin: 100% 50%;
  transform: scaleX(.8);
}

.burger-button:hover .burger-bar--2 {
  transform: scaleX(1);
}

.no-touchevents .burger-bar--2:hover {
  transform: scaleX(1);
}

.burger-bar--3 {
  transform: translateY(6px);
}

#burger.active .burger-button {
  transform: rotate(-180deg);
}

#burger.active .burger-bar {
  background-color: #fff;
}

#burger.active .burger-bar--1 {
  transform: rotate(45deg)
}

#burger.active .burger-bar--2 {
  opacity: 0;
}

#burger.active .burger-bar--3 {
  transform: rotate(-45deg)
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s
}

.sidebar-backdrop {
  background-color: rgba(0, 0, 0, .5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
}

.sidebar-panel {
  overflow-y: auto;
  background-color: #130f40;
  opacity: .5;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 8;
  padding: 3rem 20px 2rem 20px;
  width: 300px;
}

.chatButton {
  display: block;
  position: fixed;
  z-index: 10;
  right: 0;
  bottom: 0;

}
</style>
