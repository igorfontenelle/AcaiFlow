<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'ghost' | 'danger'
  disabled?: boolean
  fullWidth?: boolean
}>()

defineEmits<{ click: [] }>()
</script>

<template>
  <button
    class="base-btn"
    :class="[variant ?? 'primary', { 'full-width': fullWidth }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-btn {
  font-family: var(--font-display);
  font-weight: 800;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: transform 0.15s;
  height: 52px;
  padding: 0 20px;
}

.base-btn.full-width {
  width: 100%;
}

.base-btn:active {
  transform: scale(0.97);
}

.base-btn.primary {
  background: linear-gradient(135deg, var(--purple), #B06AE0);
  color: #fff;
  font-size: 17px;
  box-shadow: 0 4px 16px rgba(139, 68, 196, 0.35);
}

.base-btn.primary:disabled {
  background: linear-gradient(135deg, #ccc, #bbb);
  box-shadow: none;
  cursor: not-allowed;
}

.base-btn.ghost {
  background: var(--bg);
  color: var(--text-2);
  font-size: 15px;
  height: 44px;
}

.base-btn.danger {
  background: transparent;
  color: var(--red);
  font-size: 15px;
  height: 44px;
}
</style>
