<script setup lang="ts">
import { useRouter } from 'vue-router'
import ProgressStepper from '@/components/ui/ProgressStepper.vue'
import PaymentSelector from '@/components/payment/PaymentSelector.vue'
import DeliverySelector from '@/components/payment/DeliverySelector.vue'
import ContactForm from '@/components/payment/ContactForm.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useOrder } from '@/composables/useOrder'
import { useMenu } from '@/composables/useMenu'
import { usePricing } from '@/composables/usePricing'

const router = useRouter()
const { layers, customer, selectedPayment, selectedDelivery } = useOrder()
const { cup } = useMenu()
const { totalPrice, formatPrice } = usePricing(layers, cup)

const STEPS = [
  { label: 'Montagem' },
  { label: 'Resumo' },
  { label: 'Pagamento' },
  { label: 'Confirmação' },
]
</script>

<template>
  <ProgressStepper :steps="STEPS" :current-step="2" />
  <div class="pag-content">
    <div class="pag-inner">
      <PaymentSelector :selected="selectedPayment" @select="selectedPayment = $event" />
      <ContactForm v-model="customer" />
      <DeliverySelector :selected="selectedDelivery" @select="selectedDelivery = $event" />

      <div class="mini-summary">
        <div class="mini-summary-header"><span>Resumo do Pedido</span></div>
        <div class="mini-summary-body">
          <span class="mini-summary-label">Total</span>
          <span class="mini-summary-value">{{ formatPrice(totalPrice) }}</span>
        </div>
      </div>

      <BaseButton variant="primary" full-width @click="router.push('/sucesso')">
        Confirmar Pedido
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
.pag-content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.pag-inner {
  padding: 20px 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mini-summary {
  background: var(--surface);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.mini-summary-header {
  padding: 13px 16px 11px;
  border-bottom: 1.5px solid var(--separator);
}

.mini-summary-header span {
  font-size: 13px;
  font-weight: 800;
  color: var(--text);
}

.mini-summary-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px;
}

.mini-summary-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-2);
}

.mini-summary-value {
  font-size: 17px;
  font-weight: 900;
  color: var(--purple);
}
</style>
