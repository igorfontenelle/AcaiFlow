<script setup lang="ts">
import { useRouter } from 'vue-router'
import ProgressStepper from '@/components/ui/ProgressStepper.vue'
import OrderTable from '@/components/order/OrderTable.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useOrder } from '@/composables/useOrder'

const router = useRouter()
const { layers } = useOrder()

const STEPS = [
  { label: 'Montagem' },
  { label: 'Resumo' },
  { label: 'Pagamento' },
  { label: 'Confirmação' },
]
</script>

<template>
  <ProgressStepper :steps="STEPS" :current-step="1" />
  <div class="resumo-content">
    <h1 class="page-title">Resumo do Pedido</h1>
    <OrderTable :layers="layers" />
    <BaseButton variant="primary" full-width @click="router.push('/pagamento')">
      Ir para Pagamento →
    </BaseButton>
  </div>
</template>

<style scoped>
.resumo-content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 20px 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.page-title {
  font-size: 26px;
  font-weight: 900;
  color: var(--text);
  letter-spacing: -0.5px;
  padding: 0 4px;
}
</style>
