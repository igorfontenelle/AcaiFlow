import { ref, computed } from 'vue'
import type { MenuItem } from '@/types'
import { useOrder } from './useOrder'
import { useMenu } from './useMenu'

const isOpen = ref(false)
const targetItemId = ref<string | null>(null)
const editLayerIndex = ref<number | null>(null)
const stepGrams = ref(50)
const increment = ref(50)

export function useModal() {
  const { layers, addLayer, updateLayer, removeLayer, getLayersTotalGrams } = useOrder()
  const { cup, defaultIncrement } = useMenu()

  const otherGrams = computed(() => {
    const excludeIdx = editLayerIndex.value ?? undefined
    return getLayersTotalGrams(excludeIdx)
  })

  const availableGrams = computed(() => cup.capacityGrams - otherGrams.value)

  const capPercent = computed(() =>
    Math.min(((otherGrams.value + stepGrams.value) / cup.capacityGrams) * 100, 100)
  )

  const capLabel = computed(() =>
    `${otherGrams.value + stepGrams.value} / ${cup.capacityGrams}g`
  )

  const canDecrease = computed(() => stepGrams.value > increment.value)
  const canIncrease = computed(() => stepGrams.value + increment.value <= availableGrams.value)

  function openNew(item: MenuItem) {
    targetItemId.value = item.id
    editLayerIndex.value = null
    increment.value = defaultIncrement
    stepGrams.value = defaultIncrement
    isOpen.value = true
  }

  function openEdit(layerIndex: number) {
    const layer = layers.value[layerIndex]
    if (!layer) return
    targetItemId.value = layer.id
    editLayerIndex.value = layerIndex
    increment.value = defaultIncrement
    stepGrams.value = layer.grams
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    targetItemId.value = null
    editLayerIndex.value = null
  }

  function stepChange(dir: 1 | -1) {
    const next = stepGrams.value + dir * increment.value
    if (next < increment.value || next > availableGrams.value) return
    stepGrams.value = next
  }

  function setIncrement(val: number) {
    increment.value = val
    stepGrams.value = Math.max(val, Math.round(stepGrams.value / val) * val)
  }

  function setGramsDirect(value: number) {
    const clamped = Math.max(1, Math.min(value, availableGrams.value))
    stepGrams.value = Math.round(clamped * 10) / 10
  }

  function confirmAdd() {
    if (!targetItemId.value) return
    if (editLayerIndex.value !== null) {
      updateLayer(editLayerIndex.value, stepGrams.value)
    } else {
      addLayer(targetItemId.value, stepGrams.value)
    }
    close()
  }

  function confirmRemove() {
    if (editLayerIndex.value === null) return
    removeLayer(editLayerIndex.value)
    close()
  }

  return {
    isOpen,
    targetItemId,
    editLayerIndex,
    stepGrams,
    increment,
    otherGrams,
    availableGrams,
    capPercent,
    capLabel,
    canDecrease,
    canIncrease,
    openNew,
    openEdit,
    close,
    stepChange,
    setIncrement,
    setGramsDirect,
    confirmAdd,
    confirmRemove,
  }
}
