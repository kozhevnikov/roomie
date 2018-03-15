<template>
  <div class="event">
    <Time :start="event.start" :end="event.end"/>
    <a :href="event.href" :title="event.name" target="_blank">
      {{ event.name }}
    </a>
  </div>
</template>

<script>
import Time from './Time.vue';

export default {
  components: { Time },

  props: {
    event: { type: Object, required: true }
  }
};
</script>

<style>
  .event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
