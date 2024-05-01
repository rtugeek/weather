<script lang="ts" setup>
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidget,
} from '@widget-js/vue3'
import { BrowserWindowApi, WidgetData } from '@widget-js/core'
import { ref, watch } from 'vue'
import { useDebounceFn, useStorage } from '@vueuse/core'
import { DEFAULT_LOCATION, GeoApi, type GeoLocation } from '@/api/GeoApi'

const loading = ref(false)
const { widgetData, widgetParams, save } = useWidget(WidgetData)

const locationId = useStorage('locationId', DEFAULT_LOCATION.id)
const apiKey = useStorage('apiKey', '')
const selectLocation = useStorage<GeoLocation>('selectLocation', DEFAULT_LOCATION)
const locations = ref<GeoLocation[]>([selectLocation.value])

// 修改成需要设置组件参数配置
const widgetConfigOption = new WidgetConfigOption({
  custom: true,
  theme: {
    borderRadius: true,
  },
})

const searchLocation = useDebounceFn((keyword: string) => {
  if (keyword == '') {
    return
  }
  loading.value = true
  const key = apiKey.value ? apiKey.value : '8710b314b17841dfad4ec089881eb380'
  GeoApi.lookup(keyword, key).then((res) => {
    if (res.code == '200') {
      locations.value = res.location
      if (res.location.length > 0) {
        selectLocation.value = res.location[0]
      }
    }
  }).finally(() => {
    loading.value = false
  })
}, 500)

watch(locationId, () => {
  selectLocation.value = locations.value.find(it => it.id == locationId.value) || DEFAULT_LOCATION
})

function viewTutorial() {
  BrowserWindowApi.openUrl('https://www.bilibili.com/video/BV1XQ4y1v7wS/?share_source=copy_web&vd_source=d97a783ed15a74f48591bd6098a158a4&t=39', { external: true })
}
function viewQWeather() {
  BrowserWindowApi.openUrl('https://console.qweather.com/#/console', { external: true })
}
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
      <el-form label-width="70">
        <el-form-item label="地址">
          <el-select
            v-model="locationId"
            filterable
            remote-show-suffix
            remote
            clearable
            :remote-method="searchLocation"
            placeholder="请设置地址"
            style="width: 240px"
            :loading="loading"
          >
            <el-option
              v-for="item in locations"
              :key="item.id"
              :label="`${item.adm1},${item.adm2},${item.name}`"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="API KEY">
          <el-input
            v-model="apiKey"
            clearable
            placeholder="和风天气API KEY"
            style="width: 240px"
          />
          <el-button class="ml-2" type="primary" @click="viewTutorial">
            视频教程
          </el-button>
          <el-button type="warning" @click="viewQWeather">
            申请地址
          </el-button>
        </el-form-item>
      </el-form>
    </template>
  </WidgetEditDialog>
</template>

<style scoped></style>
