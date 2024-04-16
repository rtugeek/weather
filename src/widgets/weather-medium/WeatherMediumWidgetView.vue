<script lang="ts" setup>
import { LocalTwo } from '@icon-park/vue-next'
import { useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'
import { computed } from 'vue'
import { useWidget } from '@widget-js/vue3'
import { WidgetData } from '@widget-js/core'
import QWeatherWrapper from '@/component/QWeatherWrapper.vue'
import { useWeatherApi } from '@/hook/useWeatherApi'
import { WeatherUtils } from '@/utils/WeatherUtils'
import { QWeatherApi, type QWeatherNowResponse } from '@/api/QWeatherApi'

useWidget(WidgetData, {
  onDataLoaded() {
    update()
  },
})

function updateFn(): Promise<QWeatherNowResponse> {
  return QWeatherApi.now(selectLocation.value.id, apiKey.value)
}

const { errorMsg, responseData, now, selectLocation, apiKey, update } = useWeatherApi(updateFn)

const weatherData = computed(() => {
  return responseData.value?.now
})
const backgroundClass = computed(() => {
  return WeatherUtils.getBackgroundClass(Number.parseInt(weatherData.value?.icon ?? '100'))
})
useIntervalFn(() => {
  now.value = dayjs()
}, 60 * 1000)
</script>

<template>
  <QWeatherWrapper :error-msg="errorMsg">
    <div v-if="weatherData" class="flex flex-col root theme--light" :class="{ [backgroundClass]: true }">
      <div class="flex p-2">
        <div class="flex items-center">
          <img width="64px" :src="`/weather/image/${weatherData?.icon}.png`" alt="QWeather">
          <div class="current-live__item">
            <p class="text-2xl">
              {{ weatherData.temp }}°
            </p>
            <p>{{ weatherData.text }}</p>
          </div>
        </div>
        <p class="current-time ml-auto text-right leading-6">
          {{ now.format('YYYY-MM-DD HH:mm') }}
          <br>
          <span><LocalTwo />{{ selectLocation.name }}</span>
        </p>
      </div>
      <div class="current-basic flex justify-around justify-center items-center">
        <div class="flex flex-col items-center">
          <p>
            {{ weatherData.windScale }}级
          </p>
          <p>{{ weatherData.windDir }}</p>
        </div>
        <div class="flex flex-col items-center">
          <p>{{ weatherData.humidity }}%</p>
          <p>相对湿度</p>
        </div>
        <div class="flex flex-col items-center">
          <p>{{ weatherData.precip }}</p>
          <p>降水量</p>
        </div>
        <div class="flex flex-col items-center">
          <p>{{ weatherData.pressure }}hPa</p>
          <p>大气压</p>
        </div>
      </div>
    </div>
  </QWeatherWrapper>
</template>

<style scoped lang="scss">
.root {
  color: var(--text-black-1);
  border-radius: var(--widget-border-radius);
}

.current-basic{
  height: 4rem;
  font-size: 13px;
  margin: 0 12px;
  padding: 0 4px;
  font-weight: bold;
  border-radius: 12px;
  background-color: var(--city-weather-current-background-color);
  div>p:last-child{
    font-weight: normal;
    color: var(--text-black-2);
  }
}
</style>
