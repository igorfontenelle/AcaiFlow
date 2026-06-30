<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  totalGrams: number
  capacityGrams: number
  fillPercent: number
}>()

const TICKS = [1000, 750, 500, 250, 0]

const ticks = computed(() =>
  TICKS.map(t => ({
    label: t + 'g',
    isCurrent: props.totalGrams > 0 && Math.abs(props.totalGrams - t) < 126 && t !== 0 && t !== props.capacityGrams,
  }))
)
</script>

<template>
  <div class="detail-gauge">
    <div class="detail-gauge-bar">
      <div class="detail-gauge-fill" :style="{ height: fillPercent + '%' }" />
    </div>
    <div class="detail-gauge-ticks">
      <div
        v-for="tick in ticks"
        :key="tick.label"
        class="gauge-tick"
        :class="{ 'is-current': tick.isCurrent }"
      >
        <div class="gauge-tick-line" />
        <span class="gauge-tick-label">{{ tick.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-gauge {
  width: 52px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 6px 0;
  position: relative;
}

.detail-gauge-bar {
  position: absolute;
  left: 4px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: rgba(139, 68, 196, 0.1);
  border-radius: 2px;
}

.detail-gauge-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, var(--purple), #C57EEE);
  border-radius: 2px;
  transition: height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.detail-gauge-ticks {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 0 12px;
  position: relative;
  z-index: 1;
}

.gauge-tick {
  display: flex;
  align-items: center;
  gap: 4px;
}

.gauge-tick-line {
  width: 7px;
  height: 1.5px;
  background: rgba(139, 68, 196, 0.2);
  border-radius: 1px;
  flex-shrink: 0;
}

.gauge-tick-label {
  font-size: 9px;
  font-weight: 700;
  color: var(--text-2);
  white-space: nowrap;
}

.gauge-tick.is-current .gauge-tick-line {
  background: var(--purple);
  width: 10px;
}

.gauge-tick.is-current .gauge-tick-label {
  color: var(--purple);
  font-size: 10px;
}
</style>
