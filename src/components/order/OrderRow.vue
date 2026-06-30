<script setup lang="ts">
import { ingredientImages } from '@/assets/images'

const props = defineProps<{
  ingredientId: string
  iconPadding: number
  emoji: string
  color: string
  name: string
  grams: number
  price: string
}>()
</script>

<template>
  <div class="order-row">
    <div class="order-item-info">
      <div class="order-item-icon" :style="{ background: color + '22', borderColor: color + '44' }">
        <img v-if="ingredientImages[ingredientId]" :src="ingredientImages[ingredientId]" :alt="name" class="order-item-img" :style="{ padding: Math.round(props.iconPadding * 34 / 72) + 'px' }" />
        <span v-else>{{ emoji }}</span>
      </div>
      <span class="order-item-name">{{ name }}</span>
    </div>
    <span class="order-qty">{{ grams }}g</span>
    <span class="order-price">{{ price }}</span>
  </div>
</template>

<style scoped>
.order-row {
  display: grid;
  grid-template-columns: 1fr 70px 90px;
  align-items: center;
  padding: 13px 16px;
  min-height: 60px;
  border-bottom: 1px solid var(--separator);
}

.order-row:last-child {
  border-bottom: none;
}

.order-item-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.order-item-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border: 1px solid;
  flex-shrink: 0;
  overflow: hidden;
}

.order-item-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.order-item-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
}

.order-qty {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-2);
  text-align: center;
}

.order-price {
  font-size: 14px;
  font-weight: 800;
  color: var(--text);
  text-align: right;
}
</style>
