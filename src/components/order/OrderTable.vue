<script setup lang="ts">
import OrderRow from './OrderRow.vue'
import type { CupLayer } from '@/types'
import { useMenu } from '@/composables/useMenu'
import { usePricing } from '@/composables/usePricing'
import { computed } from 'vue'
import type { Ref } from 'vue'

const props = defineProps<{
  layers: CupLayer[]
}>()

const { getItem, cup } = useMenu()
const { totalGrams, totalPrice, formatPrice } = usePricing(
  computed(() => props.layers) as Ref<CupLayer[]>,
  cup
)
</script>

<template>
  <div class="order-card">
    <div class="order-table-header">
      <span>Item</span>
      <span>Quantidade</span>
      <span>Subtotal</span>
    </div>
    <div class="order-rows">
      <OrderRow
        v-for="(layer, i) in layers"
        :key="i"
        :ingredient-id="layer.id"
        :icon-padding="getItem(layer.id)?.iconPadding ?? 0"
        :emoji="getItem(layer.id)?.emoji ?? ''"
        :color="getItem(layer.id)?.color ?? '#ccc'"
        :name="getItem(layer.id)?.name ?? layer.id"
        :grams="layer.grams"
        :price="formatPrice((getItem(layer.id)?.pricePerGram ?? 0) * layer.grams)"
      />
    </div>
    <div class="order-total-row">
      <div class="order-total-left">
        <span class="order-total-title">Total</span>
        <span class="order-total-weight">{{ totalGrams }}g</span>
      </div>
      <span class="order-total-price">{{ formatPrice(totalPrice) }}</span>
    </div>
  </div>
</template>

<style scoped>
.order-card {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(139, 68, 196, 0.07);
}

.order-table-header {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 1fr 70px 90px;
  padding: 12px 16px;
  background: var(--surface);
  border-bottom: 1.5px solid var(--separator);
}

.order-rows {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: none;
}

.order-rows::-webkit-scrollbar {
  display: none;
}

.order-table-header span {
  font-size: 11px;
  font-weight: 800;
  color: var(--text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.order-table-header span:nth-child(2) {
  text-align: center;
}

.order-table-header span:nth-child(3) {
  text-align: right;
}

.order-total-row {
  flex-shrink: 0;
  background: var(--purple-xlight);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.order-total-left {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.order-total-title {
  font-size: 18px;
  font-weight: 900;
  color: var(--text);
}

.order-total-weight {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-2);
}

.order-total-price {
  font-size: 22px;
  font-weight: 900;
  color: var(--purple);
}
</style>
