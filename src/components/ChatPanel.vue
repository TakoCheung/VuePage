<template>
    <div class="chatPanel">
        <div class="sidebar-backdrop" @click="closeChatPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen"
                 class="sidebar-panel">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>
    import { chatPanelOpen, toggle } from '@/state/chatState.js'

    export default {
        methods: {
            closeChatPanel: toggle.toggleChat
        },
        computed: {
            isPanelOpen() {
                return chatPanelOpen.isChatOpen
            }
        }
    }
</script>
<style>
    .slide-enter-active,
    .slide-leave-active
    {
        transition: transform 0.2s ease;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translateX(-100%);
        transition: all 150ms ease-in 0s
    }

    .sidebar-backdrop {
        background-color: rgba(0,0,0,.5);
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
        z-index: 998;
        padding: 3rem 20px 2rem 20px;
        width: 300px;
    }
</style>
