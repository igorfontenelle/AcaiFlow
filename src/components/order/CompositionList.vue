<script setup lang="ts">
import CompositionItem from './CompositionItem.vue'
import type { CupLayer } from '@/types'
import { useMenu } from '@/composables/useMenu'
import { computed } from 'vue'

const props = defineProps<{
  layers: CupLayer[]
  totalGrams: number
  capacityGrams: number
}>()

const emit = defineEmits<{ editLayer: [index: number] }>()

const { getItem } = useMenu()

const reversedLayers = computed(() =>
  [...props.layers].map((layer, i) => ({ layer, realIndex: i })).reverse()
)

function posLabel(realIndex: number): string {
  if (realIndex === props.layers.length - 1) return '↑ topo'
  if (realIndex === 0) return '↓ base'
  return `c.${realIndex + 1}`
}
</script>

<template>
  <div class="composition-section">
    <div class="composition-header">
      <span class="composition-title">Composição</span>
      <slot name="total" />
    </div>
    <div class="composition-body">
      <div v-if="!layers.length" class="comp-empty">Nenhum ingrediente adicionado ainda.</div>
      <CompositionItem
        v-for="{ layer, realIndex } in reversedLayers"
        :key="realIndex"
        :ingredient-id="layer.id"
        :icon-padding="getItem(layer.id)?.iconPadding ?? 0"
        :name="getItem(layer.id)?.name ?? layer.id"
        :emoji="getItem(layer.id)?.emoji ?? ''"
        :color="getItem(layer.id)?.color ?? '#ccc'"
        :grams="layer.grams"
        :pct-of-total="totalGrams > 0 ? Math.round((layer.grams / totalGrams) * 100) : 0"
        :pct-of-cup="Math.round((layer.grams / capacityGrams) * 100)"
        :pos-label="posLabel(realIndex)"
        :layer-index="realIndex"
        @edit="emit('editLayer', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.composition-section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(139, 68, 196, 0.06);
}

.composition-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: none;
}

.composition-body::-webkit-scrollbar {
  display: none;
}

.composition-header {
  padding: 14px 16px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1.5px solid var(--separator);
}

.composition-title {
  font-size: 15px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.2px;
}

.comp-empty {
  padding: 28px 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-2);
}
</style>
