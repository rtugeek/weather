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
</script>

<template>
  <widget-wrapper>
    <div class="root theme--light" :class="{ [backgroundClass]: true }">
      <div v-if="errorMsg">
        {{ errorMsg }}
      </div>
      <div v-else-if="hourlyWeatherData">
        <div class="flex flex-col gap-3 p-2">
          <div class="flex items-baseline gap-1">
            <div class="text-4xl">
              {{ hourlyWeatherData.temp }}
            </div>
            <span>℃</span>
            <img style="position: absolute;right: 24px;top:24px" width="32px" :src="`/weather/icon/${hourlyWeatherData.icon}.png`">
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
                <p>{{ hourlyWeatherData.windScale }}</p>
              </div>
            </el-tooltip>
            <el-tooltip content="风速">
              <div class="current-basic-item windSpeed flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-1018" />
                </div>
                <p>{{ hourlyWeatherData.windSpeed }}</p>
              </div>
            </el-tooltip>
            <el-tooltip content="风向">
              <div class="current-basic-item windScale flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-1702 " />
                </div>
                <p>      {{ hourlyWeatherData.windDir }}</p>
              </div>
            </el-tooltip>
            <el-tooltip content="湿度">
              <div class="current-basic-item humidity flex flex-col items-center">
                <div class="text-lg">
                  <i class="qi-1036" />
                </div>
                <p>{{ hourlyWeatherData.humidity }}</p>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </widget-wrapper>
</template>

<style scoped lang="scss">
*{
  user-select: none;
}

.root {
  color: var(--text-black-1);
  border-radius: var(--widget-border-radius);
  overflow: hidden;
}

.current-basic{
  font-size: 12px;
  padding: 4px;
}
</style>
