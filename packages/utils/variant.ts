import {
  computed,
  getCurrentInstance,
  inject,
  PropType,
  reactive,
  ToRefs,
  toRefs,
  watch,
} from 'vue'
import type { ComponentName, TypeOfCSS } from '../types/variant'

export const initProps = <T>(name: string) => {
  return {
    classes: {
      type: Object as PropType<T>,
      default: (): T => {
        return DEFAULT_SETTINGS[name].default ?? {}
      },
    },
    variant: {
      type: String,
      default: undefined,
    },
  }
}
const DEFAULT_SETTINGS: Record<string, any> = {
  Card: {
    default: {
      wrapper: 'p-4 ',
      header: 'bg-white',
      body: 'p-4 text-lg',
      footer: 'bg-black',
    },
    red: {
      wrapper: 'bg-red-300',
      header: 'p-4',
      body: 'px-4 text-lg',
      footer: 'p-4',
    },
    yellow: {
      wrapper: 'bg-yellow-300',
      header: 'p-4',
      body: 'px-4 text-lg',
      footer: 'p-4',
    },
  },
  Link: {},
  Button: {},
  Dialog: {},
}

// TODO: 如果是 Tailwind 好像还应该进行下冲突检查

const mergeClasses = (valueA: TypeOfCSS, valueB: TypeOfCSS) => {
  return removeDuplicates(`${stringifyClass(valueA)} ${stringifyClass(valueB)}`)
}
const removeDuplicates = (value: string) => {
  return Array.from(new Set(value.split(' '))).join(' ')
}
const stringifyClass = (value: TypeOfCSS) => {
  let res = ''
  if (typeof value === 'string') res = value
  else if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const child = stringifyClass(value[i])
      if (child) res += child + ' '
    }
  } else if (value !== null && typeof value === 'object') {
    for (const name in value) {
      if (value[name]) res += name + ' '
    }
  }
  return res.trim()
}
export const useVariant = <T extends Record<string, any>>(): ToRefs<T> => {
  const current = getCurrentInstance()
  const currentName = <ComponentName>current?.type.name
  const globalSettings = inject('$VariantComponents', DEFAULT_SETTINGS)
  let result = reactive<Record<string, TypeOfCSS>>({})

  if (current && currentName) {
    const settings = globalSettings[currentName].default
    const classes = computed(
      () => <Record<string, TypeOfCSS>>current?.props.classes
    )
    const variant = computed(() => <string>current?.props.variant)

    result = Object.assign({}, settings)

    const update = () => {
      const variantSettings = globalSettings[currentName][variant.value]
      if (!variantSettings)
        console.warn(
          `Variant ${variant.value} of ${currentName} component is Not Found.`
        )
      Object.keys(settings).forEach((e) => {
        if (variantSettings && e in variantSettings)
          result[e] = mergeClasses(settings[e], variantSettings[e])
        if (classes && typeof classes.value === 'object' && e in classes.value)
          result[e] = mergeClasses(result[e], classes.value[e])
      })
    }

    watch(
      () => [variant.value, classes.value],
      () => update(),
      { immediate: true }
    )
  } else {
    console.warn(`Settings of ${currentName} component is Not Found.`)
  }

  return toRefs(result as T)
}
