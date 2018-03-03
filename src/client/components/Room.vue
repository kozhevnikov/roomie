<template>
  <div>
    {{ id }}
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true }
  }
};
</script>
