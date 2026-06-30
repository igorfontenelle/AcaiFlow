import menuData from '@/data/menu.json'
import type { MenuConfig, MenuItem } from '@/types'

const menu = menuData as MenuConfig

export function useMenu() {
  const cup = menu.cup
  const categories = menu.categories
  const incrementOptions = menu.incrementOptions
  const defaultIncrement = menu.defaultIncrement

  function getItem(id: string): MenuItem | undefined {
    for (const category of categories) {
      const found = category.items.find(item => item.id === id)
      if (found) return found
    }
    return undefined
  }

  function getAllItems(): MenuItem[] {
    return categories.flatMap(c => c.items)
  }

  return { cup, categories, incrementOptions, defaultIncrement, getItem, getAllItems }
}
