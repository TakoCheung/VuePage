<template>
<div v-visible="isPanelOpen" :aria-hidden="!isPanelOpen">
  <div class="app-container" :class="{ 'app-mobile': isDevice, 'app-mobile-dark': darkTheme }">
    <!-- <div>
				<button @click="resetData">
					Clear Data
				</button>
			</div> -->
    <div>
      <input v-model="currentUser.username" placeholder="Please enter your name">
    </div>
    <!-- @mouseover="hover = true" @mouseleave="hover = false" :class="{'button-dark' : hover, 'button-light' : !hover}" -->
    <b-button variant="outline-primary" :disabled="updatingData" @click="addData" >
      <span :class="{'user-logged-dark': darkTheme }">
        Logged as {{currentUser.username}}
      </span>
    </b-button>

    <div class="button-theme">

      <button :class="{'button-dark' : darkTheme, 'button-light' : !darkTheme}" @click="theme = darkTheme ? 'light' : 'dark'">
        {{darkTheme ? "Dark" : "Light"}}
      </button>
      <button class="button-github">
        <a href="https://github.com/antoine92190/vue-advanced-chat">
          <img src="@/assets/GitHub-Mark-120px-plus.png/">
        </a>
      </button>
    </div>

    <chat-container v-if="showChat" :current-user-id="currentUserId" :theme="theme" :is-device="isDevice" @show-demo-options="showDemoOptions = $event" />

    <!-- <div class="version-container">
				v1.0.0
			</div> -->
  </div>
</div>
</template>

<script>
import * as firestoreService from '@/database/firestore'
import * as storageService from '@/database/storage'

import ChatContainer from './ChatWindow'
import {
  chatPanelOpen,
  toggle
} from '@/state/chatState.js'

export default {
  components: {
    ChatContainer
  },

  data() {
    return {
      theme: 'light',
      hover: false,
      showChat: true,
      myUser: {
        _id: 'Tako',
        username: 'Tako',
        avatar: 'https://avatarfiles.alphacoders.com/184/thumb-184913.jpg'
      },
      currentUserId: window.visitorIp || 'noIp',
      isDevice: false,
      showDemoOptions: false,
      updatingData: false,
      currentUser: {
        _id: 'window.visitorIp',
        username: '',
        avatar: 'https://avatarfiles.alphacoders.com/184/thumb-184913.jpg'
      }
    }
  },

  computed: {
    isPanelOpen() {
      return chatPanelOpen.isChatOpen
    },
    darkTheme() {
      return this.theme === 'dark'
    }
  },

  watch: {
    currentUserId() {
      this.showChat = false
      setTimeout(() => (this.showChat = true), 150)
    }
  },

  mounted() {
    this.isDevice = window.innerWidth < 500
    window.addEventListener('resize', ev => {
      if (ev.isTrusted) this.isDevice = window.innerWidth < 500
    })
  },

  methods: {
    closeChatPanel: toggle.toggleChat,
    resetData() {
      firestoreService.getAllRooms().then(({
        data
      }) => {
        data.forEach(async room => {
          await firestoreService.getMessages(room.id).then(({
            data
          }) => {
            data.forEach(message => {
              firestoreService.deleteMessage(room.id, message.id)
              if (message.files) {
                message.files.forEach(file => {
                  storageService.deleteFile(
                    this.currentUserId,
                    message.id,
                    file
                  )
                })
              }
            })
          })

          firestoreService.deleteRoom(room.id)
        })
      })

      firestoreService.getAllUsers().then(({
        data
      }) => {
        data.forEach(user => {
          firestoreService.deleteUser(user.id)
        })
      })
    },
    async addData() {
      this.updatingData = true
      var curId = this.currentUser.username + '_' + window.visitorIp

      this.currentUser._id = curId
      this.currentUserId = curId
      this.currentUser.avatar = 'https://avatarfiles.alphacoders.com/184/thumb-184913.jpg'

      await firestoreService.addRoom({
        users: [this.myUser._id, this.currentUser._id],
        lastUpdated: new Date()
      })

      this.updatingData = false
    }
  }
}
</script>

<style lang="scss">
body {
    background: #fafafa;
    margin: 0;
}

input {
    -webkit-appearance: none;
}

.app-container {
    font-family: 'Quicksand', sans-serif;
    padding: 20px 30px 30px;
}

.app-mobile {
    padding: 0;

    &.app-mobile-dark {
        background: #131415;
    }

    .user-logged {
        margin: 10px 5px 0 10px;
    }

    select {
        margin: 10px 0;
    }

    .button-theme {
        margin: 10px 10px 0 0;

        .button-github {
            height: 23px;

            img {
                height: 23px;
            }
        }
    }
}

.user-logged {
    font-size: 12px;
    margin-right: 5px;
    margin-top: 10px;

    &.user-logged-dark {
        color: #fff;
    }
}

select {
    height: 20px;
    outline: none;
    border: 1px solid #e0e2e4;
    border-radius: 4px;
    background: #fff;
    margin-bottom: 20px;
}

.button-theme {
    float: right;
    display: flex;
    align-items: center;

    .button-light {
        background: #fff;
        border: 1px solid #46484e;
        color: #46484e;
    }

    .button-dark {
        background: #1c1d21;
        border: 1px solid #1c1d21;
    }

    button {
        color: #fff;
        outline: none;
        cursor: pointer;
        border-radius: 4px;
        padding: 6px 12px;
        margin-left: 10px;
        border: none;
        font-size: 14px;
        transition: 0.3s;
        vertical-align: middle;

        &.button-github {
            height: 30px;
            background: none;
            padding: 0;
            margin-left: 20px;

            img {
                height: 30px;
            }
        }

        &:hover {
            opacity: 0.8;
        }

        &:active {
            opacity: 0.6;
        }

        @media only screen and (max-width: 768px) {
            padding: 3px 6px;
            font-size: 13px;
        }
    }
}

.version-container {
    padding-top: 20px;
    text-align: right;
    font-size: 14px;
    color: grey;
}
</style>
