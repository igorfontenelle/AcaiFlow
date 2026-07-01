<script setup lang="ts">
import CupVisualizer from '@/components/cup/CupVisualizer.vue'
import CupGaugeTicks from '@/components/cup/CupGaugeTicks.vue'
import CompositionList from '@/components/order/CompositionList.vue'
import { useOrder } from '@/composables/useOrder'
import { useModal } from '@/composables/useModal'
import { useMenu } from '@/composables/useMenu'
import { usePricing } from '@/composables/usePricing'

const { layers } = useOrder()
const { openEdit } = useModal()
const { cup } = useMenu()
const { totalGrams, totalPrice, gaugePercent, formatPrice } = usePricing(layers, cup)
</script>

<template>
  <div class="detail-content">
    <div class="detail-cup-card">
      <div class="detail-card-header">
        <span class="detail-card-title">Montagem</span>
        <span class="detail-card-sub">{{ totalGrams }}g</span>
      </div>
      <div class="detail-cup-row">
        <div class="detail-cup-wrap">
          <CupVisualizer
            :layers="layers"
            :capacity-grams="cup.capacityGrams"
            :clickable="true"
            :width="190"
            :height="240"
            @edit-layer="openEdit"
          />
        </div>
        <CupGaugeTicks
          :total-grams="totalGrams"
          :capacity-grams="cup.capacityGrams"
          :fill-percent="gaugePercent"
        />
      </div>
    </div>

    <CompositionList
      :layers="layers"
      :total-grams="totalGrams"
      :capacity-grams="cup.capacityGrams"
      @edit-layer="openEdit"
    >
      <template #total>
        <span class="composition-total">{{ totalGrams }}g · {{ formatPrice(totalPrice) }}</span>
      </template>
    </CompositionList>

    <div class="detail-total">
      <div class="detail-total-row">
        <div class="detail-total-left">
          <span class="detail-total-label">Total do pedido</span>
          <span class="detail-total-weight">{{ totalGrams }}g</span>
        </div>
        <span class="detail-total-price">{{ formatPrice(totalPrice) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  padding: 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.detail-cup-card {
  flex-shrink: 0;
  background: var(--surface);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(139, 68, 196, 0.08);
}

.detail-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  margin-bottom: 14px;
  border-bottom: 1.5px solid var(--separator);
}

.detail-card-title {
  font-size: 15px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.2px;
}

.detail-card-sub {
  font-size: 13px;
  font-weight: 700;
  color: var(--purple-mid);
}

.detail-cup-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
}

.detail-cup-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 240px;
}

.composition-total {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-2);
}

.detail-total {
  flex-shrink: 0;
  background: linear-gradient(135deg, var(--purple), #B06AE0);
  border-radius: var(--radius);
  padding: 18px 20px;
  box-shadow: 0 4px 16px rgba(139, 68, 196, 0.3);
}

.detail-total-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detail-total-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-total-label {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.65);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-total-weight {
  font-size: 22px;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.3px;
}

.detail-total-price {
  font-size: 28px;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.5px;
}
</style>
