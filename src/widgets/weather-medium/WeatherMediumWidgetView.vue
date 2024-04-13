<script lang="ts" setup>
import { WidgetData } from '@widget-js/core'
import { useWidget } from '@widget-js/vue3'
import { computed, ref } from 'vue'
import { useIntervalFn, useStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { LocalTwo } from '@icon-park/vue-next'
import { DEFAULT_LOCATION, type HourlyWeatherDataItem, WeatherApi, type WeatherLocation } from '@/api/WeatherApi'

useWidget(WidgetData, {
  onDataLoaded() {
    update()
  },
})

const errorMsg = ref('')
const hourlyWeatherData = ref<HourlyWeatherDataItem>()

const backgroundClass = computed(() => {
  return WeatherApi.getBackgroundClass(Number.parseInt(hourlyWeatherData.value?.icon ?? '100'))
})
const locationId = useStorage('locationId', DEFAULT_LOCATION.id)
const selectLocation = useStorage<WeatherLocation>('selectLocation', DEFAULT_LOCATION)

function update() {
  WeatherApi.getHourly(locationId.value).then((res) => {
    if (res.code == 0) {
      hourlyWeatherData.value = res.data.hourly[0]
    }
    else {
      errorMsg.value = res.message
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
    <div v-if="hourlyWeatherData" class="flex flex-col root theme--light" :class="{ [backgroundClass]: true }">
      <div class="flex p-2">
        <div class="flex items-center">
          <img width="64px" :src="`/weather/image/${hourlyWeatherData?.icon}.png`" alt="QWeather">
          <div class="current-live__item">
            <p class="text-2xl">
              {{ hourlyWeatherData.temp }}°
            </p>
            <p>{{ hourlyWeatherData.text }}</p>
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
            {{ hourlyWeatherData.windScale }}级
          </p>
          <p>{{ hourlyWeatherData.windDir }}</p>
        </div>
        <div class="flex flex-col items-center">
          <p>{{ hourlyWeatherData.humidity }}%</p>
          <p>相对湿度</p>
        </div>
        <div class="flex flex-col items-center">
          <p>{{ hourlyWeatherData.precip }}</p>
          <p>降水量</p>
        </div>
        <div class="flex flex-col items-center">
          <p>{{ hourlyWeatherData.pressure }}hPa</p>
          <p>大气压</p>
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
