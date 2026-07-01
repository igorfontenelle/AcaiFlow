<script setup lang="ts">
import { useRouter } from 'vue-router'
import ProgressStepper from '@/components/ui/ProgressStepper.vue'
import { useOrder } from '@/composables/useOrder'
import { useMenu } from '@/composables/useMenu'
import { usePricing } from '@/composables/usePricing'

const router = useRouter()
const { layers, customer, selectedPayment, selectedDelivery, resetOrder } = useOrder()
const { cup } = useMenu()
const { totalGrams, totalPrice, formatPrice } = usePricing(layers, cup)

const PAY_LABELS: Record<string, string> = {
  credito: 'Cartão de Crédito',
  debito: 'Cartão de Débito',
  pix: 'Pix',
}

const DEL_LABELS: Record<string, string> = {
  retirada: 'Retirada no local',
  entrega: 'Entrega',
}

const STEPS = [
  { label: 'Montagem' },
  { label: 'Resumo' },
  { label: 'Pagamento' },
  { label: 'Confirmação' },
]

function novosPedido() {
  resetOrder()
  router.push('/montagem')
}
</script>

<template>
  <ProgressStepper :steps="STEPS" :current-step="3" />
  <div class="success-screen">
    <div class="success-ring">
      <svg viewBox="0 0 56 56" fill="none">
        <path d="M12 28L23 39L44 17" stroke="white" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <h2 class="success-title">Pedido Finalizado<br>com Sucesso! 🎉</h2>
    <p class="success-sub">Seu açaí está sendo preparado<br>com muito carinho.</p>

    <div class="success-card">
      <div class="success-card-header"><span>Detalhes do Pedido</span></div>
      <div class="success-card-body">
        <div class="success-card-row">
          <span class="scard-label">Cliente</span>
          <span class="scard-value">{{ customer.name || '–' }}</span>
        </div>
        <div class="success-card-row">
          <span class="scard-label">Camadas</span>
          <span class="scard-value">{{ layers.length }}</span>
        </div>
        <div class="success-card-row">
          <span class="scard-label">Peso total</span>
          <span class="scard-value">{{ totalGrams }}g</span>
        </div>
        <div class="success-card-row">
          <span class="scard-label">Pagamento</span>
          <span class="scard-value">{{ PAY_LABELS[selectedPayment] ?? '–' }}</span>
        </div>
        <div class="success-card-row">
          <span class="scard-label">Entrega</span>
          <span class="scard-value">{{ DEL_LABELS[selectedDelivery] ?? '–' }}</span>
        </div>
        <div class="success-card-row">
          <span class="scard-label">Total</span>
          <span class="scard-value highlight">{{ formatPrice(totalPrice) }}</span>
        </div>
      </div>
    </div>

    <button class="success-btn" @click="novosPedido">Fazer Novo Pedido</button>
  </div>
</template>

<style scoped>
.success-screen {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  background: var(--bg);
  overflow-y: auto;
}

.success-ring {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--green), var(--green-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(52, 199, 89, 0.35);
  animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  margin-bottom: 28px;
}

.success-ring svg {
  width: 56px;
  height: 56px;
}

.success-title {
  font-size: 26px;
  font-weight: 900;
  color: var(--text);
  text-align: center;
  letter-spacing: -0.5px;
  animation: fadeUp 0.4s 0.2s ease both;
  margin-bottom: 10px;
}

.success-sub {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-2);
  text-align: center;
  line-height: 1.5;
  animation: fadeUp 0.4s 0.3s ease both;
  margin-bottom: 36px;
}

.success-card {
  width: 100%;
  background: var(--surface);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(139, 68, 196, 0.1);
  animation: fadeUp 0.4s 0.4s ease both;
  margin-bottom: 28px;
}

.success-card-header {
  padding: 13px 16px 11px;
  border-bottom: 1.5px solid var(--separator);
}

.success-card-header span {
  font-size: 14px;
  font-weight: 800;
  color: var(--text);
}

.success-card-body {
  padding: 4px 16px;
}

.success-card-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 0;
  border-bottom: 1px solid var(--separator);
}

.success-card-row:last-child {
  border-bottom: none;
}

.scard-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
}

.scard-value {
  font-size: 14px;
  font-weight: 800;
  color: var(--text);
}

.scard-value.highlight {
  color: var(--purple);
}

.success-btn {
  width: 100%;
  height: 52px;
  background: linear-gradient(135deg, var(--green), var(--green-dark));
  color: #fff;
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 800;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(52, 199, 89, 0.35);
  animation: fadeUp 0.4s 0.5s ease both;
  transition: transform 0.15s;
}

.success-btn:active {
  transform: scale(0.97);
}
</style>
