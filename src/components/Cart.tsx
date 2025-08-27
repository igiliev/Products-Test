'use client'

import { useAtom } from 'jotai'
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  cartItemsAtom,
  cartTotalAtom,
  cartOpenAtom,
  updateQuantityAtom,
  removeFromCartAtom
} from '@/atoms/cartAtoms'
import Image from 'next/image'

export default function Cart() {
  const [cartItems] = useAtom(cartItemsAtom)
  const [cartTotal] = useAtom(cartTotalAtom)
  const [isCartOpen, setIsCartOpen] = useAtom(cartOpenAtom)
  const [, updateQuantity] = useAtom(updateQuantityAtom)
  const [, removeFromCart] = useAtom(removeFromCartAtom)

  if (!isCartOpen) return null

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity({ productId, quantity: newQuantity })
  }

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Shopping Cart
                {cartItems.length > 0 && (
                  <Badge variant="secondary">{cartItems.length}</Badge>
                )}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-500 mb-2">Your cart is empty</h3>
                <p className="text-gray-400">Add some products to get started!</p>
              </div>
            ) : (
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="p-4">
                    <div className="flex gap-3">
                      <Image
                        width={120}
                        height={200}
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-16 object-contain rounded-md border"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {item.product.title}
                        </h4>
                        <p className="text-green-600 font-semibold">
                          ${item.product.price}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveItem(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm text-gray-500 mt-1">
                          Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>

          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-green-600">${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full" size="lg">
                  Checkout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}