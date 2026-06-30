<script setup lang="ts">
import type { MenuItem } from '@/types'
import { ingredientImages } from '@/assets/images'

defineProps<{
  item: MenuItem
  totalGrams: number
  layerCount: number
  isConsecutive: boolean
}>()

defineEmits<{ select: [] }>()
</script>

<template>
  <button
    class="ing-btn"
    :class="{
      selected: totalGrams > 0,
      'ing-consecutive': isConsecutive,
    }"
    @click="$emit('select')"
  >
    <div class="ing-circle">
      <img v-if="ingredientImages[item.id]" :src="ingredientImages[item.id]" :alt="item.name" class="ing-img" :style="{ padding: (item.iconPadding ?? 0) + 'px' }" />
      <span v-else>{{ item.emoji }}</span>
      <div v-if="totalGrams > 0" class="ing-check">✓</div>
      <div v-if="layerCount > 1" class="ing-count">{{ layerCount }}</div>
    </div>
    <span class="ing-name">{{ item.name }}</span>
    <span v-if="totalGrams > 0" class="ing-added-g">{{ totalGrams }}g</span>
    <span v-if="isConsecutive" class="ing-consec-hint">última camada</span>
  </button>
</template>

<style scoped>
.ing-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.15s;
}

.ing-btn:active {
  transform: scale(0.93);
}

.ing-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--lavanda-ui);
  border: 2.5px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  transition: all 0.2s;
  position: relative;
}

.ing-btn.selected .ing-circle {
  border-color: var(--purple);
  background: var(--purple-light);
  box-shadow: 0 0 0 3px rgba(139, 68, 196, 0.15);
}

.ing-btn.ing-consecutive .ing-circle {
  border-color: rgba(139, 68, 196, 0.2) !important;
  opacity: 0.45;
}

.ing-check {
  position: absolute;
  top: -3px;
  right: -3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--purple);
  color: #fff;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.ing-count {
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: var(--gold);
  color: #fff;
  font-size: 9px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.ing-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
  text-align: center;
  line-height: 1.2;
}

.ing-added-g {
  font-size: 10px;
  font-weight: 700;
  color: var(--purple-mid);
}

.ing-consec-hint {
  font-size: 9px;
  font-weight: 700;
  color: var(--text-2);
  text-align: center;
  line-height: 1.2;
  max-width: 72px;
}

.ing-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
