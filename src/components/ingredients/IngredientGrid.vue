<script setup lang="ts">
import IngredientButton from './IngredientButton.vue'
import type { MenuItem, CupLayer } from '@/types'

const props = defineProps<{
  items: MenuItem[]
  layers: CupLayer[]
}>()

const emit = defineEmits<{
  select: [item: MenuItem]
  consecutiveBlocked: [item: MenuItem]
}>()

function getTotalGrams(itemId: string): number {
  return props.layers
    .filter(l => l.id === itemId)
    .reduce((sum, l) => sum + l.grams, 0)
}

function getLayerCount(itemId: string): number {
  return props.layers.filter(l => l.id === itemId).length
}

function isConsecutive(itemId: string): boolean {
  return props.layers.length > 0 && props.layers[props.layers.length - 1].id === itemId
}

function handleSelect(item: MenuItem) {
  if (isConsecutive(item.id)) {
    emit('consecutiveBlocked', item)
    return
  }
  emit('select', item)
}
</script>

<template>
  <div class="ingredients-grid">
    <IngredientButton
      v-for="item in items"
      :key="item.id"
      :item="item"
      :total-grams="getTotalGrams(item.id)"
      :layer-count="getLayerCount(item.id)"
      :is-consecutive="isConsecutive(item.id)"
      @select="handleSelect(item)"
    />
  </div>
</template>

<style scoped>
.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
</style>
