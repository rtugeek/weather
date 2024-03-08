<script lang="ts" setup>
import { WidgetData } from '@widget-js/core'
import { useWidget } from '@widget-js/vue3'
import { ref } from 'vue'
import { WeatherApi, type WeatherDataItem } from '@/api/WeatherApi'

useWidget(WidgetData)

const errorMsg = ref('')
const weatherData = ref<WeatherDataItem>()
WeatherApi.getDaily('101230206').then((res) => {
  if (res.code == 0) {
    weatherData.value = res.data.daily[0]
  }
  else {
    errorMsg.value = res.message
  }
}).catch((e) => {
  if (e.message) {
    errorMsg.value = e.message
  }
})
</script>

<template>
  <widget-wrapper>
    <div class="root">
      <div v-if="errorMsg">
        {{ errorMsg }}
      </div>
      weatherData: {{ weatherData }}
    </div>
  </widget-wrapper>
</template>

<style scoped>
.root {
  background-color: var(--widget-background-color);
  border-radius: var(--widget-border-radius);
}
</style>
