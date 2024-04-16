import { useIntervalFn, useStorage } from '@vueuse/core'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { DEFAULT_LOCATION, type GeoLocation } from '@/api/GeoApi'

export function useWeatherApi<T>(updateFn: () => Promise<T>) {
  const locationId = useStorage('locationId', DEFAULT_LOCATION.id)
  const selectLocation = useStorage<GeoLocation>('selectLocation', DEFAULT_LOCATION)
  const apiKey = useStorage('apiKey', '')
  const now = ref(dayjs())
  const errorMsg = ref('')
  const responseData = ref<T>()
  const loading = ref(false)
  const update = () => {
    errorMsg.value = ''
    loading.value = true
    updateFn().then((res) => {
      responseData.value = res
    }).catch((e) => {
      errorMsg.value = e.message
    }).finally(() => loading.value = false)
  }
  useIntervalFn(() => {
    update()
  }, 60 * 60 * 1000)

  return {
    locationId,
    selectLocation,
    apiKey,
    now,
    loading,
    update,
    errorMsg,
    responseData,
  }
}
