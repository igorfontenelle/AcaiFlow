export interface MenuItem {
  id: string
  name: string
  emoji: string
  color: string
  pricePerGram: number
  iconPadding?: number
  available?: boolean
}

export interface MenuCategory {
  id: string
  label: string
  items: MenuItem[]
}

export interface CupSvgConfig {
  viewBox: string
  bodyPath: string
  bodyFill: string
  bodyStroke: string
  clipPath: string
  layerInset: { top: number; left: number; right: number; bottom: number }
}

export interface CupConfig {
  id: string
  name: string
  capacityGrams: number
  pricePerKg: number
  svg: CupSvgConfig
}

export interface MenuConfig {
  cup: CupConfig
  categories: MenuCategory[]
  incrementOptions: number[]
  defaultIncrement: number
}

export interface CupLayer {
  id: string
  grams: number
}

export interface CustomerInfo {
  name: string
  whatsapp: string
}

export type PaymentMethod = 'credito' | 'debito' | 'pix'
export type DeliveryType = 'retirada' | 'entrega'
