<script setup lang="ts">
import { WidgetApi, WidgetData } from '@widget-js/core'
import { useWidget } from '@widget-js/vue3'

defineProps({
  msg: {
    type: String,
    required: false,
  },
})
const widgetData = useWidget(WidgetData, {})

function openSettings() {
  WidgetApi.openConfigPage(widgetData.widgetParams.id!)
}
</script>

<template>
  <div
    class="empty-key flex w-full text-center h-full items-center justify-center cursor-pointer"
    @click="openSettings"
  >
    <p class="p-3">
      {{ msg }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.empty-key {
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: var(--widget-border-radius);
}
</style>
