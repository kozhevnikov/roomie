<template>
  <div>
    <div>{{ event.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    event: { type: Object, required: true }
  }
};
</script>
