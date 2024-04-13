<script lang="ts" setup>
import { WidgetData } from '@widget-js/core'
import { useWidget } from '@widget-js/vue3'
import { computed, ref } from 'vue'
import { useIntervalFn, useStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { LocalTwo } from '@icon-park/vue-next'
import { StringUtils } from '../../utils/StringUtils'
import { DEFAULT_LOCATION, WeatherApi, type WeatherLocation } from '@/api/WeatherApi'
import { WidgetWeatherApi, type WidgetWeatherResponse } from '@/api/WidgetWeatherApi'

useWidget(WidgetData, {
  onDataLoaded() {
    update()
  },
})

const errorMsg = ref('')
const weatherData = ref<WidgetWeatherResponse>()

const backgroundClass = computed(() => {
  return WeatherApi.getBackgroundClass(Number.parseInt(weatherData.value?.now.cond_code ?? '100'))
})
const locationId = useStorage('locationId', DEFAULT_LOCATION.id)
const selectLocation = useStorage<WeatherLocation>('selectLocation', DEFAULT_LOCATION)

function update() {
  WidgetWeatherApi.get(locationId.value).then((res) => {
    if (res.status == 'ok') {
      weatherData.value = res
    }
    else {
      errorMsg.value = res.status
    }
  }).catch((e) => {
    if (e.message) {
      errorMsg.value = e.message
    }
  })
}

useIntervalFn(() => {
  update()
}, 60 * 60 * 1000)

const now = ref(dayjs())

useIntervalFn(() => {
  now.value = dayjs()
}, 60 * 1000)
</script>

<template>
  <widget-wrapper>
    <div v-if="weatherData" class="root theme--light" :class="{ [backgroundClass]: true }">
      <div class="flex flex-col  weather-bg relative gap-2 h-full">
        <div class="flex p-2">
          <p>
            <LocalTwo />
            {{ selectLocation.name }}
          </p>
          <p class="ml-auto text-right leading-6">
            {{ now.format('YYYY-MM-DD HH:mm') }}
            <br>
          </p>
        </div>
        <div class="flex flex-col p-2 w-full items-center gap-2 flex-1">
          <div class="flex items-center">
            <img width="80px" :src="`/weather/image/${weatherData?.now.cond_code}.png`" alt="QWeather">
            <div class="current-live__item">
              <p class="text-2xl">
                {{ weatherData.now.tmp }}°
              </p>
              <p>{{ weatherData.now.cond_txt }}</p>
            </div>
          </div>
          <p>{{ weatherData.rain.txt }}</p>
        </div>
        <div class="current-basic flex justify-around justify-center items-center mt-auto mx-4 my-4">
          <div v-for="(item, index) in weatherData.daily_forecast" :key="index" class="flex flex-col gap-2 items-center">
            <p class="font-bold">
              {{ StringUtils.getForecastDayText(index) }}
            </p>
            <img width="24px" :src="`/weather/image/${item.cond_code_d}.png`" alt="">
            <p>{{ item.tmp_min }}/{{ item.tmp_max }}°</p>
            <p :class="{ [WidgetWeatherApi.getAQIClass(Number.parseInt(weatherData.air_forecast[index].aqi))]: true }">
              {{ weatherData.air_forecast[index].qlty }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </widget-wrapper>
</template>

<style scoped lang="scss">
.root {
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
  font-size: 14px;
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
