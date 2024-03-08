<script lang="ts" setup>
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidget,
} from '@widget-js/vue3'
import { NotificationApi, WidgetData } from '@widget-js/core'
import { ref, watch } from 'vue'
import { useDebounceFn, useStorage } from '@vueuse/core'
import { DEFAULT_LOCATION, WeatherApi, type WeatherLocation } from '@/api/WeatherApi'

const loading = ref(false)
const { widgetData, widgetParams, save } = useWidget(WidgetData)

const locationId = useStorage('locationId', DEFAULT_LOCATION.id)
const selectLocation = useStorage<WeatherLocation>('selectLocation', DEFAULT_LOCATION)
const locations = ref<WeatherLocation[]>([selectLocation.value])

// 修改成需要设置组件参数配置
const widgetConfigOption = new WidgetConfigOption({
  custom: true,
  theme: {
    backgroundColor: true,
    borderRadius: true,
  },
})

const searchLocation = useDebounceFn((keyword: string) => {
  if (keyword == '') {
    return
  }
  loading.value = true
  WeatherApi.searchLocation(keyword).then((res) => {
    if (res.code == 0) {
      locations.value = res.data.list
      if (res.data.list.length > 0) {
        selectLocation.value = res.data.list[0]
      }
    }
    else {
      NotificationApi.error(res.message)
    }
  }).finally(() => {
    loading.value = false
  })
}, 500)

watch(locationId, () => {
  selectLocation.value = locations.value.find(it => it.id == locationId.value) || DEFAULT_LOCATION
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
    </template>
  </WidgetEditDialog>
</template>

<style scoped></style>
