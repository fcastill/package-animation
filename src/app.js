import Vue from 'vue';
import { createAnimationControl, STATES_NAMES } from './animation';

const PATIENCE_TIME = 15000;

new Vue({
  el: '#app',
  data: {
    ws: null,
    host: 'localhost:8090',
    connStatus: 'offline',
    lastMessage: null,
    currentAnimationState: null,
    settings: {
      isOpen: true,
      newHost: null,
    },
    animation: null,
    dropCount: 0,
    waitTimeout: null,
  },
  mounted() {
    this.settings.newHost = this.host;
    this.animation = createAnimationControl(state => this.onAnimationStateChange(state));
    global.packageGuy = this.animation;
    this.animation.standby();
  },
  computed: {
    status() {
      if (this.lastMessage) {
        return Object.keys(this.lastMessage).reduce((mostProbable, action) => {
          if (this.lastMessage[action] > mostProbable.probability && this.lastMessage[action] > 0.50) {
            mostProbable = {
              name: action,
              probability: this.lastMessage[action]
            };
          }
          return mostProbable;
        }, {
          name: null,
          probability: Number.NEGATIVE_INFINITY
        });
      }
      return {
        name: 'unknown 🤔'
      };
    },
    paddedDropCount() {
      const count = this.dropCount;
      return count < 10 ? '0' + count : count;
    },
    connectionClass() {
      return {
        'is-success': this.connStatus === 'online',
        'is-warning': this.connStatus === 'connecting',
        'is-danger': this.connStatus === 'offline',
      };
    }
  },
  watch: {
    status(status, oldStatus) {
      console.log('statusChanged', status, oldStatus);
      if (!status || !oldStatus || status.name === oldStatus.name || this.currentAnimationState === STATES_NAMES.falling) {
        return;
      }
      switch(status.name) {
        case 'waiting':
          this.animation.wait();
        break;
        case 'moving':
          this.animation.walk();
        break;
        case 'dropped':
          this.animation.fall();
        break;
        default:
          this.animation.standby();
        break;
      }
    }
  },
  methods: {
    onAnimationStateChange(state) {
      // console.log('s:', state);
      if (!state || this.connStatus != 'online') {
        // console.log('returned', state);
        return;
      }
      this.currentAnimationState = state;
      if (state === STATES_NAMES.falling) {
        this.dropCount = this.dropCount + 1; 
      }

      const hasTimeout = this.waitTimeout != null;

      if (state !== STATES_NAMES.standby && hasTimeout) {
        // console.log('timeoutcleared', state);
        clearTimeout(this.waitTimeout);
        this.waitTimeout = null;
      }

      const wait = () => {
        // console.log('cb, timeoutcleared', state);
        this.waitTimeout = null;
        this.animation.wait();
      };
      if (state === STATES_NAMES.standby && !hasTimeout) {
        // console.log('newTimeout', state);
        this.waitTimeout = setTimeout(wait, PATIENCE_TIME);
      }
    },
    openSettings() {
      this.settings.newHost = this.host;
      this.settings.isOpen = true;
    },
    closeSettings() {
      this.settings.isOpen = false;
    },
    saveSettings() {
      this.settings.isOpen = false;
      const newHost = this.settings.newHost;
      this.host = newHost.startsWith('ws://') ? newHost : `ws://${newHost}`;
      this.connect();
    },
    onMessage(event) {
      console.groupCollapsed('wsReceivedMessage');
      console.log(event.data);
      console.groupEnd();
      let msg;
      try {
        msg = JSON.parse(event.data);
        this.lastMessage = msg;
      } catch (error) {
        console.error('Ignoring malformed json');
      }
    },
    probToPercentage(probability) {
      let prob = 0;
      if (probability > 0) {
        prob = probability < 1 ? probability : 1;
      }
      let percentage = prob * 100;
      return `${percentage.toFixed(2)}%`; 
    },
    onConnectionOpen() {
      console.log('Connection open');
      this.connStatus = 'online';
    },
    onConnectionClose() {
      console.log('Connection closed');
      this.connStatus = 'offline';
    },
    connect() {
      console.log(`Connecting to "${this.host}"...`);
      if (this.ws) {
        // clean old connection
        this.ws.cleanListeners();
        this.ws.close();
      }

      this.connStatus = 'connecting';
      try {
        this.ws = new WebSocket(this.host);
      } catch (e) {
        this.connStatus = 'offline';
        console.error(e);
        return;
      }

      let messageHandler = this.onMessage.bind(this);
      this.ws.addEventListener('message', messageHandler);

      let openHandler = this.onConnectionOpen.bind(this);
      this.ws.addEventListener('open', openHandler);

      let closeHandler = this.onConnectionClose.bind(this);
      this.ws.addEventListener('close', closeHandler);

      this.ws.cleanListeners = function () {
        this.removeEventListener('message', messageHandler);
        this.removeEventListener('open', openHandler);
        this.removeEventListener('close', closeHandler);
      };
    },
  }
});
