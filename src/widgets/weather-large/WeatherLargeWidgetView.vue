<script lang="ts" setup>
import { ref } from 'vue'
import { useWidget } from '@widget-js/vue3'
import { WidgetData } from '@widget-js/core'
import { useElementSize, useIntervalFn, useStorage, watchOnce } from '@vueuse/core'
import { delay } from '@/utils/TimeUtils'

const background = useStorage('background', 1)
const hePluginStandardRef = ref<HTMLDivElement>()
const containerSize = useElementSize(hePluginStandardRef)

const { widgetData } = useWidget(WidgetData, {
  onDataLoaded(data, initialLoad) {
    if (!initialLoad) {
      window.location.reload()
    }
  },
})

function update() {
  let borderRadius = '22'
  let fontSize = '16px'
  let dataColor: string | undefined = 'ffffff'
  if (widgetData.value.theme.borderRadius) {
    borderRadius = widgetData.value.theme.borderRadius.replaceAll('px', '')
  }
  if (widgetData.value.theme.color) {
    dataColor = widgetData.value.theme.color.replaceAll('#', '')
  }
  if (widgetData.value.theme.fontSize) {
    fontSize = widgetData.value.theme.fontSize
  }
  window.WIDGET = {
    CONFIG: {
      layout: '2',
      width: containerSize.width.value,
      height: containerSize.height.value,
      background: background.value,
      dataColor,
      borderRadius,
      key: '68d458440fb9405d80a45973018cf1a2',
    },
  }
  const script = document.createElement('script')
  script.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0'
  script.async = true
  document.head.appendChild(script)
  script.onload = async () => {
    await delay(500)
    const plugin = document.getElementById('he-plugin-standard')
    plugin?.style.setProperty('font-size', fontSize)
  }
}

watchOnce(containerSize.width, () => {
  update()
})

// update every hour
useIntervalFn(() => {
  window.location.reload()
}, 60 * 60 * 1000)
</script>

<template>
  <widget-wrapper>
    <div id="he-plugin-standard" ref="hePluginStandardRef" />
  </widget-wrapper>
</template>

<style scoped>
* {
  user-select: none;
}
</style>
