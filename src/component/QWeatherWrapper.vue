<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import EmptyView from '@/component/EmptyView.vue'

defineProps({
  errorMsg: {
    type: String,
    required: false,
  },
  loading: {
    type: Boolean,
    required: false,
  },
})
const apiKey = useStorage('apiKey', '')
</script>

<template>
  <widget-wrapper>
    <template v-if="apiKey && !errorMsg">
      <slot />
    </template>
    <template v-else>
      <EmptyView :msg="errorMsg" />
    </template>
  </widget-wrapper>
</template>

<style scoped lang="scss">

</style>
