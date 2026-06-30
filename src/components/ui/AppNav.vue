<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  showBack?: boolean
  backRoute?: string
}>()

const router = useRouter()

function goBack() {
  if (props.backRoute) {
    router.push(props.backRoute)
  } else {
    router.back()
  }
}
</script>

<template>
  <nav class="nav">
    <div class="nav-left">
      <button v-if="showBack" class="nav-back" @click="goBack">
        <svg viewBox="0 0 9 15" fill="none" width="9" height="15">
          <path d="M7.5 1.5L1.5 7.5L7.5 13.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Voltar
      </button>
      <div v-else class="nav-logo">🫐</div>
    </div>
    <button class="nav-menu">
      <svg viewBox="0 0 22 16" fill="none">
        <path d="M1 1h20M1 8h20M1 15h20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </nav>
</template>

<style scoped>
.nav {
  background: var(--nav-bg);
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  flex-shrink: 0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
}

.nav-left {
  min-width: 44px;
}

.nav-logo {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.nav-back {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--purple);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  background: none;
  min-width: 44px;
  min-height: 44px;
}

.nav-menu {
  color: var(--purple);
  cursor: pointer;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: none;
  background: none;
}

.nav-menu svg {
  width: 22px;
  height: 16px;
}
</style>
