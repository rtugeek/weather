import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

export function useApiHost() {
  const host = useStorage('apiHost', '')
  const apiHost = computed(() => {
    let value = host.value.trim()
    if (!value) {
      value = 'n55u9ujf7k.re.qweatherapi.com'
    }
    if (!value.startsWith('http')) {
      return `https://${value}`
    }
    return value
  })
  return apiHost
}
