<script setup lang="ts">
import type { PaymentMethod } from '@/types'

defineProps<{
  selected: PaymentMethod
}>()

defineEmits<{ select: [method: PaymentMethod] }>()
</script>

<template>
  <div class="form-section">
    <div class="form-section-title">Forma de Pagamento</div>
    <div class="pay-methods">
      <div class="pay-row">
        <button
          class="pay-chip"
          :class="{ selected: selected === 'credito' }"
          @click="$emit('select', 'credito')"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="5" width="20" height="14" rx="3" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
          Crédito
        </button>
        <button
          class="pay-chip"
          :class="{ selected: selected === 'debito' }"
          @click="$emit('select', 'debito')"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="5" width="20" height="14" rx="3" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
          Débito
        </button>
      </div>
      <button
        class="pay-chip full-width"
        :class="{ selected: selected === 'pix' }"
        @click="$emit('select', 'pix')"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 12h4l2-8 4 16 2-8h4" />
        </svg>
        Pix
      </button>
    </div>
  </div>
</template>

<style scoped>
.form-section {
  background: var(--surface);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(139, 68, 196, 0.06);
}

.form-section-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 14px 16px 12px;
  border-bottom: 1.5px solid var(--separator);
}

.pay-methods {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px 16px;
}

.pay-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.pay-chip {
  height: 52px;
  border-radius: 12px;
  border: 2px solid var(--separator);
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.pay-chip.full-width {
  width: 100%;
}

.pay-chip svg {
  width: 20px;
  height: 20px;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.pay-chip.selected {
  border-color: var(--purple);
  color: var(--purple);
  background: var(--purple-xlight);
  box-shadow: 0 0 0 1px var(--purple);
}

.pay-chip.selected svg {
  opacity: 1;
}
</style>
