<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  message: string
  duration?: number
}>()

const emit = defineEmits<{ dismiss: [] }>()

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

watch(() => props.message, (msg) => {
  if (!msg) return
  visible.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    visible.value = false
    emit('dismiss')
  }, props.duration ?? 2500)
}, { immediate: true })
</script>

<template>
  <Transition name="toast">
    <div v-if="visible && message" class="toast">{{ message }}</div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: #1C1C1E;
  color: #fff;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  z-index: 300;
  white-space: nowrap;
  pointer-events: none;
}

.toast-enter-active {
  animation: toastIn 0.25s ease;
}

.toast-leave-active {
  transition: opacity 0.2s ease;
}

.toast-leave-to {
  opacity: 0;
}
</style>
