'use client'

import { useAtom } from 'jotai'
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { productsAtom } from '@/atoms/productAtoms'
import { currentViewAtom, selectedProductIdAtom } from '@/atoms/navigationAtoms'
import { addToCartAtom } from '@/atoms/cartAtoms'
import Image from 'next/image'
import CartIcon from './CartIcon'

export default function SingleProduct() {
  const [products] = useAtom(productsAtom)
  const [selectedProductId] = useAtom(selectedProductIdAtom)
  const [, setCurrentView] = useAtom(currentViewAtom)
  const [, addToCart] = useAtom(addToCartAtom)

  const product = products.find(p => p.id === selectedProductId)

  const handleBackToList = () => {
    setCurrentView('list')
  }

  const handleAddToCart = () => {
    if (product) addToCart(product)
  }

  if (!product) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Button onClick={handleBackToList} variant="outline" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <div className="text-center py-12">
          <p className="text-gray-500">Product not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <div className="flex gap-2">
          <CartIcon />
        </div>
      </div>
            
      <Button onClick={handleBackToList} variant="outline" className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <Image
                width={400}
                height={550}
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-contain"
              />
            </div>

            <div className="md:w-1/2 p-8">
              <Badge variant="secondary" className="mb-4">
                {product.category}
              </Badge>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-green-600 mr-4">
                  ${product.price}
                </span>
                {product.rating && (
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-gray-600">
                      {product.rating.rate} ({product.rating.count} reviews)
                    </span>
                  </div>
                )}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="flex gap-4 mb-6">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Product Details:</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Category: {product.category}</li>
                  <li>• Product ID: {product.id}</li>
                  {product.rating && (
                    <li>• Average Rating: {product.rating.rate}/5</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}