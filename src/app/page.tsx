'use client'

import { useAtom } from 'jotai'
import Products from '@/components/Products'
import SingleProduct from '@/components/SingleProduct'
import Cart from '@/components/Cart'
import { currentViewAtom } from '@/atoms/navigationAtoms'

export default function Home() {
  const [currentView] = useAtom(currentViewAtom)

  return (
    <main>
      {currentView === 'list' ? <Products /> : <SingleProduct />}
      <Cart />
    </main>
  )
}