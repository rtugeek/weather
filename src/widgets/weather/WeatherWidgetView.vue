<script lang="ts" setup>
import { LocalTwo } from '@icon-park/vue-next'
import { computed } from 'vue'
import { useWidget } from '@widget-js/vue3'
import { WidgetData } from '@widget-js/core'
import QWeatherWrapper from '@/component/QWeatherWrapper.vue'
import { useWeatherApi } from '@/hook/useWeatherApi'
import { WeatherUtils } from '@/utils/WeatherUtils'
import { WidgetWeatherApi, type WidgetWeatherResponse } from '@/api/WidgetWeatherApi'

function updateFn(): Promise<WidgetWeatherResponse> {
  return WidgetWeatherApi.get(selectLocation.value.id)
}

const { errorMsg, responseData: weatherData, selectLocation, apiKey, update } = useWeatherApi(updateFn)

const backgroundClass = computed(() => {
  return WeatherUtils.getBackgroundClass(Number.parseInt(weatherData.value?.now.cond_code ?? '100'))
})

useWidget(WidgetData, {
  onDataLoaded() {
    update()
  },
})
</script>

<template>
  <QWeatherWrapper :check-api-key="false" :error-msg="errorMsg">
    <div class="root theme--light" :class="{ [backgroundClass]: true }">
      <div v-if="weatherData">
        <div class="flex flex-col gap-3 p-2">
          <div class="flex items-baseline gap-1">
            <div class="text-4xl">
              {{ weatherData.now.tmp }}
            </div>
            <span>℃</span>
            <img
              style="position: absolute;right: 24px;top:24px" width="32px"
              :src="`/weather/image/${weatherData.now.cond_code}.png`"
            >
          </div>
          <div class="flex gap-3">
            <span class="flex gap-1 items-center"><LocalTwo />{{ selectLocation.name }}</span>
          </div>

          <div class="current-basic flex gap-2 justify-around text-sm text-center">
            <el-tooltip content="风力等级">
              <div class="current-basic-item windScale flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-2208 " />
                </div>
                <p>{{ weatherData.daily_forecast[0].wind_dir }}</p>
              </div>
            </el-tooltip>
            <el-tooltip content="空气质量">
              <div class="current-basic-item windSpeed flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-2202" />
                </div>
                <p>{{ weatherData.air_now_city.qlty }}</p>
              </div>
            </el-tooltip>
            <el-tooltip content="最低气温">
              <div class="current-basic-item windScale flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-1056 " />
                </div>
                <p class="ml-1">{{ weatherData.daily_forecast[0].tmp_min }}</p>
              </div>
            </el-tooltip>
            <el-tooltip content="最高气温">
              <div class="current-basic-item humidity flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-1009" />
                </div>
                <p class="ml-1">{{ weatherData.daily_forecast[0].tmp_max }}</p>
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
  font-size: var(--widget-font-size);
  color: var(--text-black-1);
  border-radius: var(--widget-border-radius);
  overflow: hidden;
}

.current-basic {
  font-size: 12px;
  padding: 4px;
}
</style>
