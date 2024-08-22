<script lang="ts" setup>
import { LocalTwo } from '@icon-park/vue-next'
import { useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'
import { useWidget } from '@widget-js/vue3'
import QWeatherWrapper from '@/component/QWeatherWrapper.vue'
import { useQWeatherApi } from '@/hook/useQWeatherApi'

useWidget()

const { errorMsg, weatherData, backgroundClass, now, selectLocation } = useQWeatherApi()

useIntervalFn(() => {
  now.value = dayjs()
}, 60 * 1000)
</script>

<template>
  <QWeatherWrapper :error-msg="errorMsg">
    <div class="root" :class="{ [backgroundClass]: true }">
      <div v-if="weatherData" class="flex flex-col theme--light gap-1 justify-around" style="height: 94%">
        <div class="flex px-2">
          <div class="flex items-center">
            <img width="64px" :src="`/weather/image/${weatherData?.icon}.png`" alt="QWeather">
            <div class="current-live__item">
              <p class="text-2xl">
                {{ weatherData?.temp }}°
              </p>
              <p>{{ weatherData?.text }}</p>
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
              {{ weatherData.windScale }}级
            </p>
            <p>{{ weatherData.windDir }}</p>
          </div>
          <div class="flex flex-col items-center gap-1 ">
            <p>{{ weatherData.humidity }}%</p>
            <p>相对湿度</p>
          </div>
          <div class="flex flex-col items-center gap-1">
            <p>{{ weatherData.precip }}</p>
            <p>降水量</p>
          </div>
          <div class="flex flex-col items-center gap-1">
            <p>{{ weatherData.pressure }}hPa</p>
            <p>大气压</p>
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
