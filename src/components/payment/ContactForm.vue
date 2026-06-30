<script setup lang="ts">
import type { CustomerInfo } from '@/types'

defineProps<{
  modelValue: CustomerInfo
}>()

defineEmits<{ 'update:modelValue': [value: CustomerInfo] }>()
</script>

<template>
  <div class="form-section">
    <div class="form-section-title">Informações de Contato</div>
    <div class="form-fields">
      <div class="field-wrap">
        <div class="field-label">Nome</div>
        <input
          class="field-input"
          type="text"
          placeholder="Seu nome completo"
          :value="modelValue.name"
          @input="$emit('update:modelValue', { ...modelValue, name: ($event.target as HTMLInputElement).value })"
        />
      </div>
      <div class="field-wrap">
        <div class="field-label">WhatsApp</div>
        <input
          class="field-input"
          type="tel"
          placeholder="(11) 99999-9999"
          :value="modelValue.whatsapp"
          @input="$emit('update:modelValue', { ...modelValue, whatsapp: ($event.target as HTMLInputElement).value })"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-section {
  background: var(--surface);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(139, 68, 196, 0.06);
}

.form-section-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 14px 16px 12px;
  border-bottom: 1.5px solid var(--separator);
}

.form-fields {
  display: flex;
  flex-direction: column;
}

.field-wrap {
  padding: 0 16px;
  border-bottom: 1px solid var(--separator);
}

.field-wrap:last-child {
  border-bottom: none;
}

.field-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-2);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  padding-top: 12px;
}

.field-input {
  width: 100%;
  height: 44px;
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  outline: none;
  padding: 0;
}

.field-input::placeholder {
  color: var(--text-2);
  font-weight: 500;
}
</style>
