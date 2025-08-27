'use client'

import { useAtom } from 'jotai'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { productsAtom, Product } from '@/atoms/productAtoms' // Import the Product type
import { currentViewAtom, selectedProductIdAtom } from '@/atoms/navigationAtoms'
import { addToCartAtom } from '@/atoms/cartAtoms'
import CartIcon from './CartIcon'
import Image from 'next/image'

export default function Products() {
  const [products] = useAtom(productsAtom)
  const [, setCurrentView] = useAtom(currentViewAtom)
  const [, setSelectedProductId] = useAtom(selectedProductIdAtom)
  const [, addToCart] = useAtom(addToCartAtom)

  const handleViewDetails = (productId: number) => {
    setSelectedProductId(productId)
    setCurrentView('single')
  }

  // Fix: Use proper Product type instead of any
  const handleBuyNow = (product: Product) => {
    addToCart(product);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <div className="flex gap-2">
          <CartIcon />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map(product => {
          return <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Image
                width={300}
                height={200}
                src={product.image} 
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">
                  ${product.price}
                </span>
                <div className="flex gap-2">
                  <Button className="cursor-pointer" size="sm" onClick={() => handleBuyNow(product)}>
                    Buy Now
                  </Button>
                  <Button
                    className="cursor-pointer"
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(product.id)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        })}
      </div>
    </div>
  )
}