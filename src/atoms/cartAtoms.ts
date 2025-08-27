import { atom } from 'jotai'
import { Product } from './productAtoms'

export interface CartItem {
  product: Product
  quantity: number
}

// Cart items
export const cartItemsAtom = atom<CartItem[]>([])

// Cart count (derived atom)
export const cartCountAtom = atom((get) => {
  const items = get(cartItemsAtom)
  return items.reduce((total, item) => total + item.quantity, 0)
})

// Cart total (derived atom)
export const cartTotalAtom = atom((get) => {
  const items = get(cartItemsAtom)
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
})

// Add to cart action
export const addToCartAtom = atom(
  null,
  (get, set, product: Product) => {
    const currentItems = get(cartItemsAtom)
    const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id)
    
    if (existingItemIndex >= 0) {
      const newItems = [...currentItems]
      newItems[existingItemIndex].quantity += 1
      set(cartItemsAtom, newItems)
    } else {
      set(cartItemsAtom, [...currentItems, { product, quantity: 1 }])
    }
  }
)

// Remove from cart action
export const removeFromCartAtom = atom(
  null,
  (get, set, productId: number) => {
    const currentItems = get(cartItemsAtom)
    set(cartItemsAtom, currentItems.filter(item => item.product.id !== productId))
  }
)

// Update quantity action
export const updateQuantityAtom = atom(
  null,
  (get, set, { productId, quantity }: { productId: number; quantity: number }) => {
    const currentItems = get(cartItemsAtom)
    if (quantity <= 0) {
      set(cartItemsAtom, currentItems.filter(item => item.product.id !== productId))
    } else {
      const newItems = currentItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
      set(cartItemsAtom, newItems)
    }
  }
)

// Cart open state
export const cartOpenAtom = atom<boolean>(false)