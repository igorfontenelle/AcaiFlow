import { computed } from 'vue'
import type { Ref } from 'vue'
import type { CupLayer, CupConfig } from '@/types'
import { useMenu } from './useMenu'

export function usePricing(layers: Ref<CupLayer[]>, cup: CupConfig) {
  const { getItem } = useMenu()

  const totalGrams = computed(() =>
    layers.value.reduce((sum, layer) => sum + layer.grams, 0)
  )

  const totalPrice = computed(() =>
    layers.value.reduce((sum, layer) => {
      const item = getItem(layer.id)
      return sum + (item ? item.pricePerGram * layer.grams : 0)
    }, 0)
  )

  const gaugePercent = computed(() =>
    Math.min((totalGrams.value / cup.capacityGrams) * 100, 100)
  )

  const remainingGrams = computed(() =>
    Math.max(cup.capacityGrams - totalGrams.value, 0)
  )

  const isFull = computed(() => totalGrams.value >= cup.capacityGrams)

  function formatPrice(value: number): string {
    return 'R$ ' + value.toFixed(2).replace('.', ',')
  }

  return { totalGrams, totalPrice, gaugePercent, remainingGrams, isFull, formatPrice }
}
