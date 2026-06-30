import { ref } from 'vue'
import type { CupLayer, CustomerInfo, PaymentMethod, DeliveryType } from '@/types'

const layers = ref<CupLayer[]>([])
const customer = ref<CustomerInfo>({ name: '', whatsapp: '' })
const selectedPayment = ref<PaymentMethod>('pix')
const selectedDelivery = ref<DeliveryType>('retirada')

export function useOrder() {
  function addLayer(id: string, grams: number) {
    layers.value.push({ id, grams })
  }

  function updateLayer(index: number, grams: number) {
    if (layers.value[index]) {
      layers.value[index].grams = grams
    }
  }

  function removeLayer(index: number) {
    layers.value.splice(index, 1)
  }

  function resetOrder() {
    layers.value = []
    customer.value = { name: '', whatsapp: '' }
    selectedPayment.value = 'pix'
    selectedDelivery.value = 'retirada'
  }

  function wouldBeConsecutive(id: string): boolean {
    return layers.value.length > 0 && layers.value[layers.value.length - 1].id === id
  }

  function getLayersTotalGrams(excludeIndex?: number): number {
    return layers.value.reduce((sum, layer, i) => {
      return sum + (i === excludeIndex ? 0 : layer.grams)
    }, 0)
  }

  return {
    layers,
    customer,
    selectedPayment,
    selectedDelivery,
    addLayer,
    updateLayer,
    removeLayer,
    resetOrder,
    wouldBeConsecutive,
    getLayersTotalGrams,
  }
}
