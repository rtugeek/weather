<script lang="ts" setup>
import { useWidget } from '@widget-js/vue3'
import { ref } from 'vue'
import { ClockModel } from '@/widgets/clock/model/ClockModel'

const { widgetData } = useWidget(ClockModel)

const time = ref(new Date().toLocaleTimeString())
setInterval(() => {
  time.value = new Date().toLocaleTimeString()
}, 1000)
</script>

<template>
  <widget-wrapper>
    <div class="clock">
      <span>{{ widgetData.title }}</span>
      <span>{{ time }}</span>
    </div>
  </widget-wrapper>
</template>

<style scoped>
.clock {
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--widget-background-color);
  border-radius: var(--widget-border-radius);
  color: var(--widget-color);
  justify-content: center;
}
</style>
