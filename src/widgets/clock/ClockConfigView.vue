<script lang="ts" setup>
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidget,
} from '@widget-js/vue3'
import { BrowserWindowApi } from '@widget-js/core'
import { ClockModel } from '@/widgets/clock/model/ClockModel'

const { widgetData, widgetParams, save } = useWidget(ClockModel)
BrowserWindowApi.setup({ width: 600, height: 400 })
// 修改成需要设置组件参数配置
const widgetConfigOption = new WidgetConfigOption({
  title: '时钟设置',
  theme: {
    backgroundColor: true,
    borderRadius: true,
  },
})
</script>

<template>
  <WidgetEditDialog
    v-model="widgetData"
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    @apply="save()"
    @confirm="save({ closeWindow: true })"
  >
    <template #custom>
      标题 <input v-model="widgetData.title">
    </template>
  </WidgetEditDialog>
</template>

<style scoped>

</style>
