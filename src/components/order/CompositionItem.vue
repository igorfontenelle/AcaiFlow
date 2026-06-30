<script setup lang="ts">
import { ingredientImages } from '@/assets/images'

const props = defineProps<{
  ingredientId: string
  iconPadding: number
  name: string
  emoji: string
  color: string
  grams: number
  pctOfTotal: number
  pctOfCup: number
  posLabel: string
  layerIndex: number
}>()

defineEmits<{ edit: [index: number] }>()
</script>

<template>
  <div class="comp-item" @click="$emit('edit', layerIndex)">
    <div class="comp-item-top">
      <div class="comp-dot" :style="{ background: color }" />
      <span class="comp-item-name">{{ name }}</span>
      <span class="comp-layer-pos">{{ posLabel }}</span>
      <div class="comp-item-right">
        <img v-if="ingredientImages[ingredientId]" :src="ingredientImages[ingredientId]" :alt="name" class="comp-item-img" :style="{ padding: Math.round(props.iconPadding * 20 / 72) + 'px' }" />
        <span v-else class="comp-item-emoji">{{ emoji }}</span>
        <span class="comp-item-grams">{{ grams }}g</span>
      </div>
      <span class="comp-pct">{{ pctOfTotal }}%</span>
    </div>
    <div class="comp-bar-track">
      <div class="comp-bar-fill" :style="{ width: pctOfCup + '%', background: color }" />
    </div>
  </div>
</template>

<style scoped>
.comp-item {
  padding: 12px 16px;
  border-top: 1px solid var(--separator);
  cursor: pointer;
  transition: background 0.15s;
}

.comp-item:active {
  background: var(--purple-xlight);
}

.comp-item-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.comp-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.comp-item-name {
  flex: 1;
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
}

.comp-layer-pos {
  font-size: 10px;
  font-weight: 700;
  color: var(--purple-mid);
  background: var(--purple-xlight);
  border-radius: 5px;
  padding: 1px 5px;
  flex-shrink: 0;
}

.comp-item-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.comp-item-emoji {
  font-size: 17px;
}

.comp-item-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.comp-item-grams {
  font-size: 14px;
  font-weight: 800;
  color: var(--text);
}

.comp-pct {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-2);
  min-width: 32px;
  text-align: right;
}

.comp-bar-track {
  height: 5px;
  background: rgba(139, 68, 196, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.comp-bar-fill {
  height: 100%;
  border-radius: 3px;
  opacity: 0.8;
  transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
