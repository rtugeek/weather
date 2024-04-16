<script lang="ts" setup>
import { LocalTwo } from '@icon-park/vue-next'
import { computed } from 'vue'
import { useWidget } from '@widget-js/vue3'
import { WidgetData } from '@widget-js/core'
import QWeatherWrapper from '@/component/QWeatherWrapper.vue'
import { useWeatherApi } from '@/hook/useWeatherApi'
import { WeatherUtils } from '@/utils/WeatherUtils'
import { QWeatherApi, type QWeatherNowResponse } from '@/api/QWeatherApi'

function updateFn(): Promise<QWeatherNowResponse> {
  return QWeatherApi.now(selectLocation.value.id, apiKey.value)
}

const { errorMsg, responseData, selectLocation, apiKey, update } = useWeatherApi(updateFn)

const weatherData = computed(() => {
  return responseData.value?.now
})

const backgroundClass = computed(() => {
  return WeatherUtils.getBackgroundClass(Number.parseInt(weatherData.value?.icon ?? '100'))
})

useWidget(WidgetData, {
  onDataLoaded() {
    update()
  },
})
</script>

<template>
  <QWeatherWrapper :error-msg="errorMsg">
    <div class="root theme--light" :class="{ [backgroundClass]: true }">
      <div v-if="weatherData">
        <div class="flex flex-col gap-3 p-2">
          <div class="flex items-baseline gap-1">
            <div class="text-4xl">
              {{ weatherData.temp }}
            </div>
            <span>℃</span>
            <img
              style="position: absolute;right: 24px;top:24px" width="32px"
              :src="`/weather/image/${weatherData.icon}.png`"
            >
          </div>
          <div class="flex gap-3">
            <span class="flex gap-1 items-center"><LocalTwo />{{ selectLocation.name }}</span>
          </div>

          <div class="current-basic flex gap-2 justify-evenly text-sm">
            <el-tooltip content="风力等级">
              <div class="current-basic-item windScale flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-2208 " />
                </div>
                <p>{{ weatherData.windScale }}</p>
              </div>
            </el-tooltip>
            <el-tooltip content="风速">
              <div class="current-basic-item windSpeed flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-1018" />
                </div>
                <p>{{ weatherData.windSpeed }}</p>
              </div>
            </el-tooltip>
            <el-tooltip content="风向">
              <div class="current-basic-item windScale flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-1702 " />
                </div>
                <p>{{ weatherData.windDir }}</p>
              </div>
            </el-tooltip>
            <el-tooltip content="湿度">
              <div class="current-basic-item humidity flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-1036" />
                </div>
                <p>{{ weatherData.humidity }}</p>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </QWeatherWrapper>
</template>

<style scoped lang="scss">
.root {
  color: var(--text-black-1);
  border-radius: var(--widget-border-radius);
  overflow: hidden;
}

.current-basic {
  font-size: 12px;
  padding: 4px;
}
</style>
