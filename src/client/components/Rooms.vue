<template>
  <div id="rooms">
    <Room
      v-for="(id, index) in ids"
      :key="id + index"
      :id="id"
      @macy="recalculate"
    />
  </div>
</template>

<script>
import Macy from 'macy';

import Room from './Room.vue';

export default {
  components: { Room },

  props: {
    ids: { type: Array, required: true }
  },

  mounted() {
    this.macy = new Macy({
      container: '#rooms',
      columns: 5,
      breakAt: {
        1200: 4,
        992: 3,
        768: 2,
        576: 1
      },
      margin: 0
    });
    this.recalculate();
  },

  methods: {
    recalculate() {
      this.macy.recalculate(true);
    }
  }
};
</script>
