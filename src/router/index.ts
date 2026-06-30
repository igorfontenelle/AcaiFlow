import { createRouter, createWebHistory } from 'vue-router'
import { useOrder } from '@/composables/useOrder'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/montagem' },
    {
      path: '/montagem',
      component: () => import('@/views/MontageView.vue'),
    },
    {
      path: '/detalhe',
      component: () => import('@/views/DetailView.vue'),
    },
    {
      path: '/resumo',
      component: () => import('@/views/ResumoView.vue'),
    },
    {
      path: '/pagamento',
      component: () => import('@/views/PagamentoView.vue'),
    },
    {
      path: '/sucesso',
      component: () => import('@/views/SucessoView.vue'),
    },
  ],
})

const GUARDED_ROUTES = ['/resumo', '/pagamento', '/sucesso']

router.beforeEach((to) => {
  if (GUARDED_ROUTES.includes(to.path)) {
    const { layers } = useOrder()
    if (layers.value.length === 0) {
      return '/montagem'
    }
  }
})

export default router
