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
  checkApiKey: {
    type: Boolean,
    required: false,
    default: true,
  },
})
const apiKey = useStorage('apiKey', '')
</script>

<template>
  <widget-wrapper>
    <template v-if="checkApiKey && !apiKey">
      <EmptyView msg="点击设置 和风天气 API KEY" />
    </template>
    <template v-else-if="errorMsg">
      <EmptyView :msg="errorMsg" />
    </template>
    <template v-else>
      <slot />
    </template>
  </widget-wrapper>
</template>

<style scoped lang="scss">

</style>
