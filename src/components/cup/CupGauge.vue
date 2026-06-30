<script setup lang="ts">
defineProps<{
  totalGrams: number
  capacityGrams: number
  fillPercent: number
}>()
</script>

<template>
  <div class="gauge">
    <div class="gauge-label">{{ capacityGrams }}g</div>
    <div class="gauge-track">
      <div class="gauge-fill" :style="{ height: fillPercent + '%' }" />
    </div>
    <div class="gauge-label current">{{ totalGrams }}g</div>
  </div>
</template>

<style scoped>
.gauge {
  width: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
}

.gauge-track {
  flex: 1;
  width: 6px;
  background: rgba(139, 68, 196, 0.12);
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  margin: 4px 0;
}

.gauge-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, var(--purple), #C57EEE);
  border-radius: 3px;
  transition: height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.gauge-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-2);
  text-align: center;
}

.gauge-label.current {
  color: var(--purple);
  font-size: 11px;
}
</style>
