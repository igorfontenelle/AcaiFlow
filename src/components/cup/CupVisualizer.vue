<script setup lang="ts">
import CupLayer from './CupLayer.vue'
import type { CupLayer as CupLayerType } from '@/types'
import { useMenu } from '@/composables/useMenu'

const props = defineProps<{
  layers: CupLayerType[]
  capacityGrams: number
  clickable?: boolean
  width?: number
  height?: number
}>()

const emit = defineEmits<{ editLayer: [index: number] }>()

const { cup, getItem } = useMenu()

const svgW = props.width ?? 180
const svgH = props.height ?? 220

const svgScale = Math.min(svgW / 180, svgH / 220)
const svgYPad = (svgH - 220 * svgScale) / 2
const bottomInset = Math.ceil(svgH - (206 * svgScale + svgYPad))
</script>

<template>
  <div class="cup-svg-wrap" :style="{ width: svgW + 'px', height: svgH + 'px' }">
    <svg
      class="cup-bg"
      :viewBox="cup.svg.viewBox"
      fill="none"
      :width="svgW"
      :height="svgH"
    >
      <path
        :d="cup.svg.bodyPath"
        :fill="cup.svg.bodyFill"
        stroke="none"
      />
    </svg>

    <div
      class="cup-layers"
      :style="{
        'clip-path': cup.svg.clipPath,
        top: cup.svg.layerInset.top + 'px',
        left: cup.svg.layerInset.left + 'px',
        right: cup.svg.layerInset.right + 'px',
        bottom: bottomInset + 'px',
      }"
    >
      <CupLayer
        v-for="(layer, i) in layers"
        :key="i"
        :index="i"
        :ingredient-id="layer.id"
        :icon-padding="getItem(layer.id)?.iconPadding ?? 0"
        :color="getItem(layer.id)?.color ?? '#ccc'"
        :emoji="getItem(layer.id)?.emoji ?? ''"
        :height-percent="(layer.grams / capacityGrams) * 100"
        :clickable="clickable"
        @edit="emit('editLayer', $event)"
      />
    </div>

    <div v-if="layers.length === 0" class="cup-empty-label">
      Adicione<br>ingredientes
    </div>

    <svg
      class="cup-border"
      :viewBox="cup.svg.viewBox"
      fill="none"
      :width="svgW"
      :height="svgH"
    >
      <path
        :d="cup.svg.bodyPath"
        fill="none"
        :stroke="cup.svg.bodyStroke"
        stroke-width="5"
      />
      <rect x="10" y="6" width="160" height="18" rx="9" fill="#EDE0F8" stroke="#C8A8E9" stroke-width="2.5" />
    </svg>
  </div>
</template>

<style scoped>
.cup-svg-wrap {
  position: relative;
}

.cup-bg {
  position: absolute;
  inset: 0;
}

.cup-layers {
  position: absolute;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
}

.cup-border {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cup-empty-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-2);
  text-align: center;
  line-height: 1.4;
  pointer-events: none;
}
</style>
