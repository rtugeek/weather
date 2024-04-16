<script setup lang="ts">
import { WidgetApi, WidgetData } from '@widget-js/core'
import { useWidget } from '@widget-js/vue3'
import { useStorage } from '@vueuse/core'

defineProps({
  msg: {
    type: String,
    required: false,
  },
})
const apiKey = useStorage('apiKey', '')
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
    <div class="p-3">
      <p v-if="!apiKey">
        点击设置<br>和风天气API KEY
      </p>
      <p v-else>
        {{ msg }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.empty-key {
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: var(--widget-border-radius);
}
</style>
