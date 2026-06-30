<script setup lang="ts">
import type { MenuCategory } from '@/types'

defineProps<{
  categories: MenuCategory[]
  activeId: string
}>()

defineEmits<{ select: [id: string] }>()
</script>

<template>
  <div class="tabs-bar">
    <button
      v-for="cat in categories"
      :key="cat.id"
      class="tab-btn"
      :class="{ active: cat.id === activeId }"
      @click="$emit('select', cat.id)"
    >
      {{ cat.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs-bar {
  background: var(--surface);
  border-radius: 14px;
  padding: 4px;
  display: flex;
  gap: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.tab-btn {
  flex: 1;
  height: 36px;
  border: none;
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  color: var(--text-2);
}

.tab-btn.active {
  background: linear-gradient(135deg, var(--purple), #B06AE0);
  color: #fff;
  box-shadow: 0 2px 8px rgba(139, 68, 196, 0.3);
}
</style>
