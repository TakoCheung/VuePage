<template>
<div class="el-tab-pane" v-visible="isPanelOpen" :aria-hidden="!isPanelOpen">
  <slot>
    <iframe id=" liveChat"  class="chat-panel" src="http://75.165.171.62:3000/" style="width:100%; height:100%;"></iframe>
  </slot>
</div>
</template>
<script>
import {
  chatPanelOpen,
  toggle
} from '@/state/chatState.js'

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
