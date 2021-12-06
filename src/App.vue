<template>
  <VueScrollProgress>
 <div id="app">
 <!--<v-header :title=this.$route.name></v-header>-->
  <nav class="main-nav">
   <Burger/>
   <router-view/>

   <Sidebar>
    <ul class="sidebar-panel-nav">
     <li @click="toggle"><router-link to="/">Welcome</router-link></li>
     <li @click="toggle"><router-link to="/about">About</router-link></li>
     <li @click="toggle"><router-link to="/education">Education</router-link></li>
     <li @click="toggle"><router-link to="/WorkExpriences">Work Expriences</router-link></li>
     </ul>
    </Sidebar>
  </nav>
 </div>
 </VueScrollProgress>
</template>

<script>
import Burger from './components/Menu/Burger.vue';
import Sidebar from './components/Menu/Sidebar.vue';
import { store, mutations } from './store.js'
export default {
 name: 'app',
 components: {
   Sidebar,
   Burger
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
   overflow:auto;
 }

 body {
   border: 0; margin: 0; padding: 0;
   font-family: 'Lato';
   height: 100%;
   background: rgba(32, 77, 72, 50%)/*linear-gradient(45deg, rgba(101,31,87,1) 0%, rgba(225,113,87,5) 48%, rgba(249,248,113,1) 100%);*/
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

 ul.sidebar-panel-nav > li > a {
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
</style>
