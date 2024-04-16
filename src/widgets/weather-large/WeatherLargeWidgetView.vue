<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'
import { LocalTwo } from '@icon-park/vue-next'
import { computed } from 'vue'
import { useWidget } from '@widget-js/vue3'
import { WidgetData } from '@widget-js/core'
import { StringUtils } from '@/utils/StringUtils'
import { WidgetWeatherApi, type WidgetWeatherResponse } from '@/api/WidgetWeatherApi'
import { useWeatherApi } from '@/hook/useWeatherApi'
import { WeatherUtils } from '@/utils/WeatherUtils'
import QWeatherWrapper from '@/component/QWeatherWrapper.vue'

function updateFn(): Promise<WidgetWeatherResponse> {
  return WidgetWeatherApi.get(selectLocation.value.id)
}
const { errorMsg, responseData: weatherData, now, selectLocation, update } = useWeatherApi(updateFn)

const backgroundClass = computed(() => {
  return WeatherUtils.getBackgroundClass(Number.parseInt(weatherData.value?.now.cond_code ?? '100'))
})

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
  <QWeatherWrapper :check-api-key="false" :error-msg="errorMsg">
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
  </QWeatherWrapper>
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
