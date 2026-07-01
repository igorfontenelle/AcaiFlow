<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useModal } from '@/composables/useModal'
import { useMenu } from '@/composables/useMenu'
import { ingredientImages } from '@/assets/images'

const {
  isOpen,
  targetItemId,
  editLayerIndex,
  stepGrams,
  increment,
  capPercent,
  capLabel,
  canDecrease,
  canIncrease,
  close,
  stepChange,
  setIncrement,
  setGramsDirect,
  confirmAdd,
  confirmRemove,
} = useModal()

const isEditingGrams = ref(false)
const rawInput = ref('')
const gramInputRef = ref<HTMLInputElement | null>(null)

function openGramInput() {
  rawInput.value = String(stepGrams.value)
  isEditingGrams.value = true
  nextTick(() => gramInputRef.value?.select())
}

function commitGramInput() {
  const normalized = rawInput.value.replace(',', '.')
  const parsed = parseFloat(normalized)
  if (!isNaN(parsed) && parsed > 0) {
    setGramsDirect(parsed)
  }
  isEditingGrams.value = false
}

function cancelGramInput() {
  isEditingGrams.value = false
}

const { getItem, incrementOptions } = useMenu()

const item = computed(() => targetItemId.value ? getItem(targetItemId.value) : null)
const isEditing = computed(() => editLayerIndex.value !== null)
const title = computed(() => isEditing.value ? `Editar ${item.value?.name}` : `Adicionar ${item.value?.name}`)
const subtitle = computed(() => isEditing.value
  ? 'Ajuste a quantidade ou remova a camada'
  : 'Informe a quantidade desejada'
)
const btnLabel = computed(() => isEditing.value ? 'Atualizar quantidade' : 'Adicionar camada')

function handleOverlayClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
    close()
  }
}
</script>

<template>
  <Transition name="overlay">
    <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
      <Transition name="sheet">
        <div v-if="isOpen" class="modal">
          <div class="modal-handle" />
          <div class="modal-icon">
            <img v-if="item && ingredientImages[item.id]" :src="ingredientImages[item.id]" :alt="item.name" class="modal-img" :style="{ padding: (item?.iconPadding ?? 0) + 'px' }" />
            <span v-else>{{ item?.emoji }}</span>
          </div>
          <h2 class="modal-title">{{ title }}</h2>
          <p class="modal-sub">{{ subtitle }}</p>

          <div class="cap-bar-wrap">
            <div class="cap-bar-track">
              <div class="cap-bar-fill" :style="{ width: capPercent + '%' }" />
            </div>
            <span class="cap-bar-label">{{ capLabel }}</span>
          </div>

          <div class="stepper">
            <button class="step-btn" :disabled="!canDecrease" @click="stepChange(-1)">−</button>
            <div class="step-display">
              <template v-if="isEditingGrams">
                <input
                  ref="gramInputRef"
                  v-model="rawInput"
                  class="step-input"
                  type="text"
                  inputmode="decimal"
                  @blur="commitGramInput"
                  @keydown.enter.prevent="commitGramInput"
                  @keydown.escape="cancelGramInput"
                />
              </template>
              <template v-else>
                <span class="step-value step-value--clickable" @click="openGramInput">{{ stepGrams }}</span>
              </template>
              <span class="step-unit">g</span>
            </div>
            <button class="step-btn" :disabled="!canIncrease" @click="stepChange(1)">+</button>
          </div>

          <div class="inc-row">
            <span class="inc-label">Passo:</span>
            <button
              v-for="opt in incrementOptions"
              :key="opt"
              class="inc-chip"
              :class="{ active: increment === opt }"
              @click="setIncrement(opt)"
            >
              {{ opt }}g
            </button>
          </div>

          <div class="modal-actions">
            <BaseButton variant="primary" full-width @click="confirmAdd">{{ btnLabel }}</BaseButton>
            <BaseButton v-if="isEditing" variant="danger" full-width @click="confirmRemove">
              Remover ingrediente
            </BaseButton>
            <BaseButton variant="ghost" full-width @click="close">Cancelar</BaseButton>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 100;
}

.modal {
  width: 100%;
  max-width: 390px;
  background: var(--surface);
  border-radius: 24px 24px 0 0;
  padding: 0 24px 40px;
}

.modal-handle {
  width: 36px;
  height: 4px;
  background: var(--separator);
  border-radius: 2px;
  margin: 12px auto 20px;
}

.modal-icon {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: var(--lavanda-ui);
  border: 2px solid var(--separator);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 38px;
  margin: 0 auto 16px;
  overflow: hidden;
}

.modal-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.modal-title {
  font-size: 20px;
  font-weight: 900;
  color: var(--text);
  text-align: center;
  letter-spacing: -0.3px;
  margin-bottom: 6px;
}

.modal-sub {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-2);
  text-align: center;
  margin-bottom: 8px;
}

.cap-bar-wrap {
  background: var(--purple-xlight);
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cap-bar-track {
  flex: 1;
  height: 6px;
  background: var(--separator);
  border-radius: 3px;
  overflow: hidden;
}

.cap-bar-fill {
  height: 100%;
  background: linear-gradient(to right, var(--purple), #C57EEE);
  border-radius: 3px;
  transition: width 0.3s;
}

.cap-bar-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--purple-mid);
  white-space: nowrap;
}

.stepper {
  display: flex;
  align-items: center;
  background: var(--purple-xlight);
  border-radius: 14px;
  padding: 4px;
  margin-bottom: 16px;
}

.step-btn {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: var(--purple);
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-btn:active {
  background: var(--purple-light);
}

.step-btn:disabled {
  color: var(--text-2);
  cursor: not-allowed;
}

.step-display {
  flex: 1;
  text-align: center;
}

.step-value {
  font-size: 28px;
  font-weight: 900;
  color: var(--text);
  letter-spacing: -0.5px;
}

.step-value--clickable {
  cursor: pointer;
  text-decoration: underline dotted var(--text-2);
  text-underline-offset: 4px;
}

.step-input {
  width: 80px;
  font-size: 28px;
  font-weight: 900;
  color: var(--text);
  letter-spacing: -0.5px;
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--purple);
  text-align: center;
  outline: none;
}

.step-unit {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-2);
  margin-left: 2px;
}

.inc-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 20px;
}

.inc-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-2);
}

.inc-chip {
  height: 28px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1.5px solid var(--separator);
  background: transparent;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-2);
  cursor: pointer;
  transition: all 0.15s;
}

.inc-chip.active {
  background: var(--purple);
  color: #fff;
  border-color: var(--purple);
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Transitions */
.overlay-enter-active,
.overlay-leave-active {
  transition: background 0.3s, backdrop-filter 0.3s;
}

.overlay-enter-from,
.overlay-leave-to {
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(0px);
}

.sheet-enter-active {
  transition: transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.sheet-leave-active {
  transition: transform 0.3s ease;
}

.sheet-enter-from,
.sheet-leave-to {
  transform: translateY(100%);
}
</style>
