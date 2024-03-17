<script lang="ts" setup>
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidget,
} from '@widget-js/vue3'
import { BrowserWindowApi, WidgetData } from '@widget-js/core'
import { useStorage } from '@vueuse/core'

const { widgetData, widgetParams, save } = useWidget(WidgetData)
const background = useStorage('background', 1)

// 修改成需要设置组件参数配置
const widgetConfigOption = new WidgetConfigOption({
  custom: true,
  theme: {
    backgroundColor: false,
    borderRadius: true,
    color: true,
  },
})

BrowserWindowApi.setup({
  height: 400,
  width: 600,
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
      <el-form-item label="背景样式">
        <el-radio-group v-model="background">
          <el-radio :value="1">
            随天气变化
          </el-radio>
          <el-radio :value="3">
            深色
          </el-radio>
          <el-radio :value="2">
            浅色
          </el-radio>
          <el-radio :value="5">
            透明
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
  </WidgetEditDialog>
</template>

<style scoped></style>
