import { atom } from 'jotai'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

// Products atom with refresh capability
export const productsAtom = atom(async (): Promise<Product[]> => {
  const response = await fetch('https://fakestoreapi.com/products?limit=5')
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
})