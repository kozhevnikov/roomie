import Vue from 'vue';
import Vuex from 'vuex';
import 'whatwg-fetch';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: new Map()
  },

  mutations: {
    setRoom(state, { id, room }) {
      state.rooms.set(id, room);
    }
  },

  actions: {
    async getRoom({ state, commit }, id) {
      if (state.rooms.has(id)) {
        return state.rooms.get(id);
      }

      const response = await fetch(`/api/room/${encodeURIComponent(id)}`, { credentials: 'same-origin' });

      if (!response.ok) {
        const message = await response.text() || response.statusText;
        const error = new Error(message);
        error.code = response.status;
        throw error;
      }

      const room = await response.json();
      commit('setRoom', { id, room });

      return room;
    }
  }
});
