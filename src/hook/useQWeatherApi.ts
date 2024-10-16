import { useDebounceFn, useIntervalFn, useStorage } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { useWidgetTheme } from '@widget-js/vue3'
import { DEFAULT_LOCATION, type GeoLocation } from '@/api/GeoApi'
import { WeatherUtils } from '@/utils/WeatherUtils'
import {
  type DailyIndex,
  type QWeatherAir5dResponse,
  QWeatherApi,
  type QWeatherDailyResponse,
  type QWeatherNowResponse,
} from '@/api/QWeatherApi'

export function useQWeatherApi(option?: { useIndex?: boolean, useAir?: boolean, useWeather3d?: boolean }) {
  const locationId = useStorage('locationId', DEFAULT_LOCATION.id)
  const selectLocation = useStorage<GeoLocation>('selectLocation', DEFAULT_LOCATION)
  const apiKey = useStorage('apiKey', '')
  const now = ref(dayjs())
  const errorMsg = ref('')
  const responseData = ref<QWeatherNowResponse>()
  const loading = ref(false)
  const dailyIndex = ref<DailyIndex>()
  const air5dResponse = ref<QWeatherAir5dResponse>()
  const weather3dResponse = ref<QWeatherDailyResponse>()
  const widgetTheme = useWidgetTheme()
  const selectedUnit = useStorage('selectedUnit', 'C')
  const unitText = computed(() => {
    return selectedUnit.value == 'C' ? '°C' : '°F'
  })
  const weatherData = computed(() => {
    return responseData.value?.now
  })

  const temperature = computed(() => {
    if (!responseData.value) {
      return 0
    }
    if (selectedUnit.value == 'F') {
      const cTemp = Number(responseData.value.now.temp)
      return (cTemp * 9 / 5) + 32
    }
    return responseData.value?.now.temp
  })

  const backgroundClass = computed(() => {
    if (widgetTheme.widgetTheme.value.useGlobalTheme) {
      return 'widget-default'
    }
    else {
      return WeatherUtils.getBackgroundClass(Number.parseInt(weatherData.value?.icon ?? '100'))
    }
  })

  const updateIndex = () => {
    QWeatherApi.indices(selectLocation.value.id, apiKey.value).then((res) => {
      // 从res.daily中随机取一个
      dailyIndex.value = res.daily[Math.floor(Math.random() * res.daily.length)]
    })
  }

  const updateWeather3d = () => {
    QWeatherApi.weather3d(selectLocation.value.id, apiKey.value).then((res) => {
      weather3dResponse.value = res
    })
  }

  const updateAir5d = () => {
    QWeatherApi.indices(selectLocation.value.id, apiKey.value).then((res) => {
      // 从res.daily中随机取一个
      dailyIndex.value = res.daily[Math.floor(Math.random() * res.daily.length)]
    })
  }

  const update = () => {
    errorMsg.value = ''
    loading.value = true
    if (option?.useIndex) {
      updateIndex()
    }
    if (option?.useAir) {
      updateAir5d()
    }
    if (option?.useWeather3d) {
      updateWeather3d()
    }
    QWeatherApi.weatherNow(selectLocation.value.id, apiKey.value).then((res) => {
      responseData.value = res
    }).catch((e) => {
      errorMsg.value = e.message
    }).finally(() => loading.value = false)
  }

  const debounceUpdate = useDebounceFn(update, 1000)

  watch(apiKey, () => {
    debounceUpdate()
  })

  watch(selectLocation, () => {
    debounceUpdate()
  })

  useIntervalFn(() => {
    update()
  }, 60 * 60 * 1000, { immediate: true, immediateCallback: true })

  return {
    locationId,
    selectLocation,
    apiKey,
    air5dResponse,
    backgroundClass,
    now,
    temperature,
    weatherData,
    dailyIndex,
    unitText,
    loading,
    weather3dResponse,
    update,
    errorMsg,
    responseData,
  }
}
