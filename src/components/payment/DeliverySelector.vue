<script setup lang="ts">
import type { DeliveryType } from '@/types'

defineProps<{
  selected: DeliveryType
}>()

defineEmits<{ select: [type: DeliveryType] }>()

const options: { type: DeliveryType; icon: string; title: string; sub: string }[] = [
  { type: 'retirada', icon: '🏪', title: 'Retirada no local', sub: 'Retire seu pedido na loja' },
  { type: 'entrega',  icon: '🛵', title: 'Entrega',          sub: 'Receba em casa · taxa a combinar' },
]
</script>

<template>
  <div class="form-section">
    <div class="form-section-title">Tipo de Entrega</div>
    <div class="delivery-opts">
      <div
        v-for="opt in options"
        :key="opt.type"
        class="delivery-opt"
        :class="{ selected: selected === opt.type }"
        @click="$emit('select', opt.type)"
      >
        <span class="delivery-opt-icon">{{ opt.icon }}</span>
        <div class="delivery-opt-body">
          <div class="delivery-opt-title">{{ opt.title }}</div>
          <div class="delivery-opt-sub">{{ opt.sub }}</div>
        </div>
        <div class="delivery-opt-radio">
          <div v-if="selected === opt.type" class="delivery-opt-dot" />
        </div>
      </div>
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

.delivery-opts {
  padding: 12px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.delivery-opt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid var(--separator);
  cursor: pointer;
  transition: all 0.2s;
}

.delivery-opt.selected {
  border-color: var(--purple);
  background: var(--purple-xlight);
}

.delivery-opt-icon {
  font-size: 22px;
}

.delivery-opt-body {
  flex: 1;
}

.delivery-opt-title {
  font-size: 15px;
  font-weight: 800;
  color: var(--text);
}

.delivery-opt-sub {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-2);
}

.delivery-opt-radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--separator);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
  flex-shrink: 0;
}

.delivery-opt.selected .delivery-opt-radio {
  border-color: var(--purple);
}

.delivery-opt-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--purple);
}
</style>
