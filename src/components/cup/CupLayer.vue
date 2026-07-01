<script setup lang="ts">
import { ingredientImages } from '@/assets/images'

const props = defineProps<{
  color: string
  emoji: string
  ingredientId: string
  iconPadding: number
  heightPercent: number
  clickable?: boolean
  index: number
}>()

const emit = defineEmits<{ edit: [index: number] }>()
</script>

<template>
  <div
    class="cup-layer"
    :class="{ 'cup-layer--clickable': clickable }"
    :style="{ height: heightPercent + '%', background: color }"
    @click="clickable && emit('edit', index)"
  >
    <span v-if="clickable" class="cup-layer-label">
      <img v-if="ingredientImages[ingredientId]" :src="ingredientImages[ingredientId]" :alt="ingredientId" class="layer-img" :style="{ padding: Math.round(props.iconPadding * 20 / 72) + 'px' }" />
      <span v-else>{{ emoji }}</span>
    </span>
  </div>
</template>

<style scoped>
.cup-layer {
  width: 100%;
  opacity: 0.88;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  transition: height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cup-layer--clickable {
  cursor: pointer;
  transition: opacity 0.15s, filter 0.15s, height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cup-layer--clickable:hover {
  filter: brightness(1.12);
}

.cup-layer--clickable:active {
  opacity: 0.6;
}

.cup-layer-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  pointer-events: none;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layer-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
</style>
