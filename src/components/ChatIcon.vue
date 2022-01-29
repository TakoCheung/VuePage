<template>
<div id="chatIcon" :class="{ 'active' : isChatActive }" @click.prevent="toggle">
  <b-icon class="chatButton" icon="chat-text" type="button" animation="Throb" font-scale="2"></b-icon>
</div>
</template>
<script>
import {
  chatPanelOpen,
  toggle
} from '@/state/chatState.js'

export default {
  computed: {
    isChatActive() {
      return chatPanelOpen.isChatOpen
    }
  },
  methods: {
    toggle() {
      toggle.toggleChat()
    }
  }
}
</script>
