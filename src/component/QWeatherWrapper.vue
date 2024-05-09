<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import EmptyView from '@/component/EmptyView.vue'
import { BrowserWindowApi } from '@widget-js/core'

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
function viewTutorial() {
  BrowserWindowApi.openUrl('https://www.bilibili.com/video/BV1XQ4y1v7wS/?share_source=copy_web&vd_source=d97a783ed15a74f48591bd6098a158a4&t=39', { external: true })
}

function viewQWeather() {
  BrowserWindowApi.openUrl('https://console.qweather.com/#/console', { external: true })
}
</script>

<template>
  <widget-wrapper>
    <template v-if="checkApiKey && !apiKey">
      <EmptyView>
        <div class="flex flex-col gap-4 items-center">
          <span>点击设置 和风天气 API KEY</span>
          <div class="flex flex-wrap gap-1 items-center justify-center">
            <el-button @click.stop="viewTutorial" class="w-20" type="primary">
              视频教程
            </el-button>
            <span></span>
            <el-button @click.stop="viewQWeather" class="w-20" type="warning">
              申请地址
            </el-button>
          </div>
        </div>
      </EmptyView>
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
