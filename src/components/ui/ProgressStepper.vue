<script setup lang="ts">
export interface Step {
  label: string
}

const props = defineProps<{
  steps: Step[]
  currentStep: number
}>()

function stepState(index: number): 'done-green' | 'done' | 'active' | 'pending' {
  const isLast = props.currentStep === props.steps.length - 1
  if (isLast && index <= props.currentStep) return 'done-green'
  if (index < props.currentStep) return 'done'
  if (index === props.currentStep) return 'active'
  return 'pending'
}

const fillPercent = (() => {
  if (props.steps.length <= 1) return 0
  return Math.round((props.currentStep / (props.steps.length - 1)) * 100)
})()
</script>

<template>
  <div class="progress-bar">
    <div class="progress-steps">
      <div class="progress-line">
        <div class="progress-line-fill" :style="{ width: fillPercent + '%' }" />
      </div>
      <div
        v-for="(step, i) in steps"
        :key="step.label"
        class="step-node"
        :class="stepState(i)"
      >
        <div class="step-circle">
          <span v-if="stepState(i) === 'done' || stepState(i) === 'done-green'">✓</span>
          <span v-else>{{ i + 1 }}</span>
        </div>
        <span class="step-label">{{ step.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  background: var(--surface);
  padding: 14px 24px 12px;
  border-bottom: 1px solid var(--separator);
  flex-shrink: 0;
}

.progress-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.progress-line {
  position: absolute;
  top: 14px;
  left: 14px;
  right: 14px;
  height: 2px;
  background: var(--separator);
  z-index: 0;
}

.progress-line-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(to right, var(--purple), #B06AE0);
  border-radius: 1px;
  transition: width 0.5s ease;
}

.step-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  position: relative;
  z-index: 1;
}

.step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
  border: 2px solid var(--separator);
  background: var(--bg);
  color: var(--text-2);
  transition: all 0.3s;
}

.step-node.done .step-circle {
  background: var(--purple);
  border-color: var(--purple);
  color: #fff;
}

.step-node.active .step-circle {
  background: #fff;
  border-color: var(--purple);
  color: var(--purple);
  box-shadow: 0 0 0 3px rgba(139, 68, 196, 0.15);
}

.step-node.done-green .step-circle {
  background: var(--green);
  border-color: var(--green);
  color: #fff;
}

.step-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-2);
  white-space: nowrap;
}

.step-node.active .step-label,
.step-node.done .step-label {
  color: var(--purple);
}

.step-node.done-green .step-label {
  color: var(--green);
}
</style>
