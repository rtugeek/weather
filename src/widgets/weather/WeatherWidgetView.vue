<script lang="ts" setup>
import { WidgetData } from '@widget-js/core'
import { useWidget } from '@widget-js/vue3'
import { computed, ref } from 'vue'
import { LocalTwo } from '@icon-park/vue-next'
import { useIntervalFn, useStorage } from '@vueuse/core'
import { DEFAULT_LOCATION, type HourlyWeatherDataItem, WeatherApi, type WeatherLocation } from '@/api/WeatherApi'

useWidget(WidgetData, {
  onDataLoaded() {
    update()
  },
})

const errorMsg = ref('')
const hourlyWeatherData = ref<HourlyWeatherDataItem>()

const backgroundColor = computed(() => {
  return WeatherApi.getBackgroundColor(hourlyWeatherData.value?.icon ?? '')
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
</script>

<template>
  <widget-wrapper>
    <div class="root">
      <div v-if="errorMsg">
        {{ errorMsg }}
      </div>
      <div v-else-if="hourlyWeatherData" class="p-2">
        <div class="flex flex-col gap-3">
          <div class="flex items-baseline gap-1">
            <div class="temp">
              {{ hourlyWeatherData.temp }}
            </div>
            <span>℃</span>
          </div>
          <div class="flex gap-3">
            <div class="windScale flex gap-1 items-center">
              <i :class="`qi-${hourlyWeatherData?.icon}`" />
              {{ hourlyWeatherData.text }}
            </div>
            <span class="flex gap-1 items-center"><LocalTwo />{{ selectLocation.name }}</span>
          </div>

          <div class="w-full flex gap-2 justify-evenly text-sm">
            <el-tooltip content="风力等级">
              <div class="windScale flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-2208 " />
                </div>
                {{ hourlyWeatherData.windScale }}
              </div>
            </el-tooltip>
            <el-tooltip content="风速">
              <div class="windSpeed flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-1018" />
                </div>
                {{ hourlyWeatherData.windSpeed }}
              </div>
            </el-tooltip>
            <el-tooltip content="风向">
              <div class="windScale flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-1702 " />
                </div>
                {{ hourlyWeatherData.windDir }}
              </div>
            </el-tooltip>
            <el-tooltip content="湿度">
              <div class="humidity flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-1036" />
                </div>
                {{ hourlyWeatherData.humidity }}
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </widget-wrapper>
</template>

<style scoped>
*{
  user-select: none;
}

.root {
  color:white;
  background: v-bind(backgroundColor);
  border-radius: var(--widget-border-radius);
}

.temp{
  font-size: 2.5rem;
}
</style>
