<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNav from '@/components/ui/AppNav.vue'
import IngredientModal from '@/components/ingredients/IngredientModal.vue'

const route = useRoute()

const NAV_CONFIG: Record<string, { showBack: boolean; backRoute?: string }> = {
  '/montagem':  { showBack: false },
  '/detalhe':   { showBack: true, backRoute: '/montagem' },
  '/resumo':    { showBack: true, backRoute: '/montagem' },
  '/pagamento': { showBack: true, backRoute: '/resumo' },
  '/sucesso':   { showBack: false },
}

const navProps = computed(() => NAV_CONFIG[route.path] ?? { showBack: false })
</script>

<template>
  <div class="phone">
    <AppNav :show-back="navProps.showBack" :back-route="navProps.backRoute" />
    <RouterView />
    <IngredientModal />
  </div>
</template>

<style scoped>
.phone {
  width: min(390px, 100vw);
  height: 100vh;
  height: 100dvh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
</style>
