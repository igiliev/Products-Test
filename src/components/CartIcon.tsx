'use client'

import { useAtom } from 'jotai'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cartCountAtom, cartOpenAtom } from '@/atoms/cartAtoms'

export default function CartIcon() {
  const [cartCount] = useAtom(cartCountAtom)
  const [, setCartOpen] = useAtom(cartOpenAtom)

  return (
    <Button
      variant="outline"
      size="sm"
      className="relative cursor-pointer"
      onClick={() => setCartOpen(true)}
    >
      <ShoppingCart className="h-4 w-4" />
      {cartCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
        >
          {cartCount}
        </Badge>
      )}
      <span className="ml-2">Cart</span>
    </Button>
  )
}