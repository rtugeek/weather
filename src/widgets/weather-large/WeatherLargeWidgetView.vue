<script lang="ts" setup>
import { ref } from 'vue'
import { useWidget } from '@widget-js/vue3'
import { WidgetData } from '@widget-js/core'
import { useStorage } from '@vueuse/core'
import { delay } from '@/utils/TimeUtils'

const background = useStorage('background', 1)
const hePluginStandardRef = ref<HTMLDivElement>()

const { widgetData } = useWidget(WidgetData, {
  onDataLoaded(data, initialLoad) {
    if (initialLoad) {
      update()
    }
    else {
      window.location.reload()
    }
  },
})

function update() {
  let borderRadius = '22'
  let dataColor: string | undefined = 'ffffff'
  if (widgetData.value.theme.borderRadius) {
    borderRadius = widgetData.value.theme.borderRadius.replaceAll('px', '')
  }
  if (widgetData.value.theme.color) {
    dataColor = widgetData.value.theme.color.replaceAll('#', '')
  }
  window.WIDGET = {
    CONFIG: {
      layout: '2',
      width: 250,
      height: 250,
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
    plugin?.style.removeProperty('width')
    plugin?.style.removeProperty('height')
    plugin?.style.setProperty('font-size', '16px')
  }
}
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
