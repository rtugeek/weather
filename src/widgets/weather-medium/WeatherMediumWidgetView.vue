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
import { WidgetWeatherApi, type WidgetWeatherResponse } from '@/api/WidgetWeatherApi'

useWidget(WidgetData, {
  onDataLoaded() {
    update()
  },
})

function updateFn(): Promise<WidgetWeatherResponse> {
  return WidgetWeatherApi.get(selectLocation.value.id)
}

const { errorMsg, responseData, now, selectLocation, apiKey, update } = useWeatherApi(updateFn)

const weatherData = computed(() => {
  return responseData.value?.now
})

const backgroundClass = computed(() => {
  return WeatherUtils.getBackgroundClass(Number.parseInt(weatherData.value?.cond_code ?? '100'))
})

useIntervalFn(() => {
  now.value = dayjs()
}, 60 * 1000)
</script>

<template>
  <QWeatherWrapper :check-api-key="false" :error-msg="errorMsg">
    <div class="root" :class="{ [backgroundClass]: true }">
      <div v-if="responseData" class="flex flex-col theme--light gap-1 justify-around" style="height: 94%" >
        <div class="flex px-2">
          <div class="flex items-center">
            <img width="64px" :src="`/weather/image/${weatherData?.cond_code}.png`" alt="QWeather">
            <div class="current-live__item">
              <p class="text-2xl">
                {{ weatherData?.tmp }}°
              </p>
              <p>{{ weatherData?.cond_txt }}</p>
            </div>
          </div>
          <p class="current-time ml-auto text-right leading-6">
            {{ now.format('YYYY-MM-DD HH:mm') }}
            <br>
            <span><LocalTwo />{{ selectLocation.name }}</span>
          </p>
        </div>
        <div class="current-basic flex justify-around justify-center items-center">
          <div class="flex flex-col items-center gap-1">
            <p>
              {{responseData?.air_forecast[0].qlty}}
            </p>
            <p>空气质量</p>
          </div>
          <div class="flex flex-col items-center gap-1">
            <p>{{ responseData?.daily_forecast[0].wind_dir }}</p>
            <p>预报风向</p>
          </div>
          <div class="flex flex-col items-center gap-1">
            <p>{{ responseData?.daily_forecast[0].tmp_min }}℃</p>
            <p>最低气温</p>
          </div>
          <div class="flex flex-col items-center gap-1">
            <p>{{responseData?.daily_forecast[0].tmp_max}}℃</p>
            <p>最高气温</p>
          </div>
        </div>
      </div>
    </div>
  </QWeatherWrapper>
</template>

<style lang="scss">
html{
  font-size: var(--widget-font-size);
}
.root {
  color: var(--text-black-1);
  border-radius: var(--widget-border-radius);
}

.current-basic{
  height: 4rem;
  font-size: 0.8rem;
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
