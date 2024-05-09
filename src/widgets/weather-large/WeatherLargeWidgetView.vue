<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'
import { LocalTwo } from '@icon-park/vue-next'
import { useWidget } from '@widget-js/vue3'
import { WidgetData } from '@widget-js/core'
import { StringUtils } from '../../utils/StringUtils'
import { useQWeatherApi } from '@/hook/useQWeatherApi'
import QWeatherWrapper from '@/component/QWeatherWrapper.vue'

const { errorMsg, weatherData, backgroundClass, now, selectLocation, dailyIndex, update, weather3dResponse } = useQWeatherApi({ useIndex: true, useWeather3d: true })

useWidget(WidgetData, {
  onDataLoaded() {
    update()
  },
})

useIntervalFn(() => {
  now.value = dayjs()
}, 60 * 1000)
</script>

<template>
  <QWeatherWrapper :error-msg="errorMsg">
    <div v-if="weatherData" class="root theme--light" :class="{ [backgroundClass]: true }">
      <div class="flex flex-col weather-bg relative h-full ">
        <div class="flex px-2 py-1 items-center">
          <p>
            <LocalTwo />
            {{ selectLocation.name }}
          </p>
          <p class="ml-auto text-right leading-6">
            {{ now.format('YYYY-MM-DD HH:mm') }}
            <br>
          </p>
        </div>
        <div class="flex flex-col w-full items-center justify-center gap-1 flex-1 mb-1">
          <div class="flex items-center">
            <img width="70rem" :src="`/weather/image/${weatherData?.icon}.png`" alt="QWeather">
            <div class="current-live__item">
              <p class="text-2xl">
                {{ weatherData.temp }}°
              </p>
              <p>{{ weatherData.text }}</p>
            </div>
          </div>
          <p class="text-center p-4">
            {{ dailyIndex?.text }}
          </p>
        </div>
        <div class="current-basic flex justify-around justify-center items-center mt-auto mx-4 my-4">
          <div v-for="(item, index) in weather3dResponse?.daily" :key="index" class="flex flex-col gap-1 items-center">
            <p class="font-bold">
              {{ StringUtils.getForecastDayText(index) }}
            </p>
            <img width="24px" :src="`/weather/image/${item.iconDay}.png`" alt="">
            <p>{{ item.tempMin }}/{{ item.tempMax }}°</p>
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
}

.weather-bg{
  background-size: 540px auto;
  background-repeat: no-repeat;
  background-position: right top;
}

.city-weather-cloudy{
  .weather-bg{
    background-image: url("/weather/image/cloudy--day.png");
  }
}

.city-weather-haze{
  .weather-bg{
    background-image: url("/weather/image/haze--day.png");
  }
}

.city-weather-rain{
  .weather-bg{
    background-image: url("/weather/image/rain--day.png");
  }
}

.current-basic {
  padding: 8px 4px;
  border-radius: 12px;
  background-color: var(--city-weather-current-background-color);
}

.city-weather-aqi-1 {
  color: rgb(49, 143, 38)
}
.city-weather-aqi-2{
  color: rgb(122, 111, 31);
}
.city-weather-aqi-3{
  color: rgb(255, 126, 0)
}
.city-weather-aqi-4{
  color: rgb(255, 0, 0)
}
.city-weather-aqi-4{
  color: rgb(153, 0, 76)
}
.city-weather-aqi-6{
  color: (126,0,35);
}
</style>
