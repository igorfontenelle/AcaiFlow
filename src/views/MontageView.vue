<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import CupVisualizer from '@/components/cup/CupVisualizer.vue'
import CupGauge from '@/components/cup/CupGauge.vue'
import CategoryTabs from '@/components/ingredients/CategoryTabs.vue'
import IngredientGrid from '@/components/ingredients/IngredientGrid.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import ToastMessage from '@/components/ui/ToastMessage.vue'
import { useOrder } from '@/composables/useOrder'
import { useModal } from '@/composables/useModal'
import { useMenu } from '@/composables/useMenu'
import { usePricing } from '@/composables/usePricing'

const router = useRouter()
const { layers } = useOrder()
const { openNew, openEdit } = useModal()
const { cup, categories } = useMenu()
const { totalGrams, totalPrice, gaugePercent, formatPrice } = usePricing(layers, cup)

const activeCategory = ref(categories[0].id)

const activeCategoryItems = computed(
  () => categories.find(c => c.id === activeCategory.value)?.items ?? []
)

const toastMessage = ref('')

function handleConsecutiveBlocked() {
  toastMessage.value = 'Já é a última camada! Adicione outro antes.'
}

function handleToastDismiss() {
  toastMessage.value = ''
}
</script>

<template>
  <div class="content">
    <div class="cup-card">
      <div class="cup-card-header">
        <span class="cup-card-title">Montagem</span>
        <button class="arrow-btn" @click="router.push('/detalhe')">
          <svg viewBox="0 0 8 13" fill="none">
            <path d="M1 1l6 5.5L1 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      <div class="cup-card-body">
        <div class="cup-wrapper">
          <CupVisualizer
            :layers="layers"
            :capacity-grams="cup.capacityGrams"
            :clickable="true"
            @edit-layer="openEdit"
          />
        </div>
        <CupGauge
          :total-grams="totalGrams"
          :capacity-grams="cup.capacityGrams"
          :fill-percent="gaugePercent"
        />
      </div>
    </div>

    <div class="info-row">
      <div class="info-card" @click="router.push('/detalhe')">
        <div class="info-card-top">
          <span class="info-card-title">Resumo</span>
          <button class="arrow-btn" aria-hidden="true">
            <svg viewBox="0 0 8 13" fill="none">
              <path d="M1 1l6 5.5L1 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
        <div class="info-label">Preço</div>
        <div class="info-value">{{ formatPrice(totalPrice) }}</div>
        <div class="info-sub">
          <div class="info-label">Peso</div>
          <div class="info-value" style="font-size: 16px">{{ totalGrams }}g</div>
        </div>
      </div>
      <div class="info-card">
        <div class="info-card-top"><span class="info-card-title">Tabela</span></div>
        <div class="info-label">Preço por KG</div>
        <div class="info-value secondary">{{ formatPrice(cup.pricePerKg) }}</div>
        <div class="info-sub">
          <div class="info-label">Capacidade</div>
          <div class="info-value secondary" style="font-size: 16px">{{ cup.capacityGrams }}g</div>
        </div>
      </div>
    </div>

    <div class="cta-wrap">
      <BaseButton
        variant="primary"
        full-width
        :disabled="totalGrams === 0"
        @click="router.push('/resumo')"
      >
        Finalizar Pedido
      </BaseButton>
    </div>

    <CategoryTabs
      :categories="categories"
      :active-id="activeCategory"
      @select="activeCategory = $event"
    />

    <IngredientGrid
      :items="activeCategoryItems"
      :layers="layers"
      @select="openNew"
      @consecutive-blocked="handleConsecutiveBlocked"
    />
  </div>

  <ToastMessage :message="toastMessage" @dismiss="handleToastDismiss" />
</template>

<style scoped>
.content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 16px 120px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cup-card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.cup-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-bottom: 1.5px solid var(--separator);
}

.cup-card-title {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 800;
  color: var(--text);
}

.cup-card-body {
  display: flex;
  gap: 16px;
  align-items: stretch;
}

.cup-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 220px;
}

.arrow-btn {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--lavanda-ui);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--purple);
  flex-shrink: 0;
  transition: background 0.15s;
}

.arrow-btn:active {
  background: var(--purple-light);
}

.arrow-btn svg {
  width: 6px;
  height: 10px;
}

.info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.info-card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 14px 16px;
  box-shadow: var(--shadow-card);
  cursor: pointer;
  transition: transform 0.15s;
}

.info-card:active {
  transform: scale(0.97);
}

.info-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1.5px solid var(--separator);
}

.info-card-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--text);
}


.info-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-2);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 2px;
}

.info-value {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 900;
  color: var(--purple);
  letter-spacing: -0.3px;
  line-height: 1;
}

.info-value.secondary {
  color: var(--gold);
}

.info-sub {
  margin-top: 6px;
}

.cta-wrap {
  padding: 0 0 4px;
}
</style>
